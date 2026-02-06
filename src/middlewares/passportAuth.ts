import { Express } from "express";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UserModel } from "@models/userModel";

const { JWT_TOKEN } = process.env;

interface IUser {
  id: string;
  userId: string;
}

export default (app: Express) => {
  const options = {
    secretOrKey: JWT_TOKEN,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  try {
    passport.use(
      new Strategy(options, async (payload: IUser, done: Function) => {
        if (!payload) {
          return done(null, false);
        }
        const userId = payload?.userId;
        const user = await UserModel.findById(userId);

        return done(null, user || false);
      }),
    );

    app.use(passport.initialize());
  } catch (error) {
    throw new Error(error);
  }
};
