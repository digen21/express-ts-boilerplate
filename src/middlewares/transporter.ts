import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

import TokenModel from "@models/tokenModel";
import { IUser } from "@types";
import { env } from "@config";

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, EMAIL_FROM } = env;

export default async (data: IUser, mailType) => {
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
      },
    });

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
  } catch (error) {}
};
