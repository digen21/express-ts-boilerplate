import { Schema } from "mongoose";

interface IToken {
  userId: string | Schema.Types.ObjectId;
  token: string;
  _id: Schema.Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

export default IToken;