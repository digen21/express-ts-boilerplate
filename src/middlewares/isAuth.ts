import { NextFunction, Request, RequestHandler, Response } from "express";
import passport from "passport";
import { ExtractJwt } from "passport-jwt";
const { JWT_TOKEN } = process.env;

const options = {
  secretOrKey: JWT_TOKEN,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const isAuth: RequestHandler = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export default isAuth;
