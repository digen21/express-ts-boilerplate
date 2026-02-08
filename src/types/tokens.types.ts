import { Types } from "mongoose";

interface IToken {
  userId: Types.ObjectId;
  token: string;
  expiresAt?: Date;
  referenceId?: Types.ObjectId;
  _id: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

export default IToken;
