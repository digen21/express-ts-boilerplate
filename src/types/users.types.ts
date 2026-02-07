import { Schema } from "mongoose";
import IRole from "./roles.types";

interface IUser {
  username?: string;
  name?: string;
  password: string;
  id: string;
  _id: string;
  email: string;
  avatar?: string;
  phoneNumber?: string;
  isVerified: boolean;
  providerId?: string;
  provider?: string;
  roleId: Schema.Types.ObjectId | string;
  role?: IRole;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export type UserWithToken = IUser & { token: string };
export default IUser;
