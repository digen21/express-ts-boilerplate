import { RequestHandler } from "express";
import httpStatus from "http-status";
import passport from "passport";

const isAuth: RequestHandler = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Unauthorized",
        status: httpStatus.UNAUTHORIZED,
      });
    }

    const userInfo = user;
    delete userInfo.password;
    req.user = userInfo;
    next();
  })(req, res, next);
};

export default isAuth;
