import { Express } from "express";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UserModel } from "@models/userModel";
import { IRole, IUser } from "@types";

const { JWT_TOKEN } = process.env;

interface JWT_USER {
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
      new Strategy(options, async (payload: JWT_USER, done: Function) => {
        if (!payload) {
          return done(null, false);
        }
        const userId = payload?.userId;
        const user = await UserModel.findById(
          userId,
          {},
          {
            populate: {
              path: "role",
              select: "name",
            },
            lean: true,
          },
        );

        if (!user) return done(null, false);

        const userInfo: IUser = { ...user, role: user?.role as IRole };
        return done(null, userInfo);
      }),
    );

    app.use(passport.initialize());
  } catch (error) {
    throw new Error(error);
  }
};
