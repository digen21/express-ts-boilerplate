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
import { isAuth, validate } from "@middlewares";
import {
  googleAuthValidator,
  loginValidator,
  registerValidator,
  verifyMailValidator,
} from "@validators";

const authRouter = express.Router();

authRouter.post("/register", validate(registerValidator), register);
authRouter.post("/login", validate(loginValidator), login);
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
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthSuccess,
);

authRouter.get("/google/failure", googleAuthFailure);

authRouter.post(
  "/google/mobile",
  validate(googleAuthValidator),
  googleMobileAuth,
);

export default authRouter;
