import { Schema, model } from "mongoose";

const tokenSchema = new Schema(
  {
    userId: {
      type: "string",
      trim: true, // will remove white space
      required: true,
    },
    token: {
      type: "string",
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("token", tokenSchema);
