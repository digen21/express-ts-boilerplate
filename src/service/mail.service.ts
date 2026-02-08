import bcrypt from "bcrypt";
import { Types } from "mongoose";

import { env, transporter } from "@config";
import { IUser } from "@types";
import { logger } from "@utils";
import { tokenService } from "./base.service";

const { EMAIL_FROM } = env;

export const sendVerificationMail = async (data: IUser) => {
  try {
    const verifyToken = await bcrypt.hash(data.id.toString(), 10);

    await tokenService.create({
      userId: data.id,
      token: verifyToken,
    });

    const options = {
      from: EMAIL_FROM,
      to: data.email,
      subject: "Verification Email",
      // basically the FE URL
      html: `<a href="${"http://localhost:3000"}/api/auth/verify-mail?token=${verifyToken}">Click Here To Verify Mail</a>`,
    };

    await transporter.sendMail(options);
  } catch (error) {
    logger.error("Failed to send verification mail", {
      context: "Nodemailer",
      error,
    });
  }
};

export const sendServiceRequestConfirmationMail = async (
  user: IUser,
  serviceRequestId: Types.ObjectId,
) => {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

  tokenService.create({
    userId: user._id,
    referenceId: serviceRequestId,
    token,
    type: "SERVICE_REQUEST_CONFIRM",
    expiresAt,
  });

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: user.email,
    subject: "Confirm your service request",
    html: `
      <p>Please confirm your service request</p>
      <a href="${env.FRONT_END_URL}/confirm-service?token=${token}">
        Confirm Request
      </a>
    `,
  });
};
