import bcrypt from "bcrypt";
import { Types } from "mongoose";
import nodemailer from "nodemailer";

import { env } from "@config";
import TokenModel from "@models/tokenModel";
import { IUser } from "@types";
import { logger } from "@utils";

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, EMAIL_FROM } = env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

export default async (data: IUser, mailType) => {
  try {
    const verifyToken = await bcrypt.hash(data.id.toString(), 10);

    const token = new TokenModel({
      userId: data.id,
      token: verifyToken,
    });

    await token.save();

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

  await TokenModel.create({
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
