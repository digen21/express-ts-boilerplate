import { Types } from "mongoose";

interface IToken {
  userId: Types.ObjectId;
  token: string;
  type: string;
  expiresAt?: Date;
  referenceId?: Types.ObjectId;
  _id: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
  readonly isDeleted: boolean;
  readonly deletedAt?: Date;
}

export default IToken;
