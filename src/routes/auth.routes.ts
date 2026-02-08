import express from "express";
import passport from "passport";

import {
  googleAuthFailure,
  googleAuthSuccess,
  googleMobileAuth,
  login,
  register,
  verifyMail,
} from "@controllers";
import { authLimiter, isAuth, validate } from "@middlewares";
import {
  googleAuthValidator,
  loginValidator,
  registerValidator,
  verifyMailValidator,
} from "@validators";

const authRouter = express.Router();

authRouter.post(
  "/register",
  authLimiter,
  validate(registerValidator),
  register,
);
authRouter.post("/login", authLimiter, validate(loginValidator), login);
authRouter.post("/verify-mail", validate(verifyMailValidator), verifyMail);
authRouter.get("/profile", isAuth, (req, res) => {
  return res.status(200).send({
    success: true,
    user: req.user,
    status: 200,
  });
});

authRouter.get(
  "/google/web",
  authLimiter,
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  authLimiter,
  passport.authenticate("google", { session: false }),
  googleAuthSuccess,
);

authRouter.get("/google/failure", googleAuthFailure);

authRouter.post(
  "/google/mobile",
  authLimiter,
  validate(googleAuthValidator),
  googleMobileAuth,
);

export default authRouter;
