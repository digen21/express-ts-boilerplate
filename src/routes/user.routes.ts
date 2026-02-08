import express from "express";

import { updateUser } from "@controllers";
import { validate } from "@middlewares";
import { updateUserValidator } from "@validators";

const userRouter = express.Router();

userRouter.put("/update", validate(updateUserValidator), updateUser);

export default userRouter;
