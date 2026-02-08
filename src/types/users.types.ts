import { Types } from "mongoose";
import IRole from "./roles.types";

interface IUser {
  username?: string;
  name?: string;
  password: string;
  id: Types.ObjectId;
  _id: Types.ObjectId;
  email: string;
  avatar?: string;
  phoneNumber?: string;
  isVerified: boolean;
  providerId?: string;
  provider?: string;
  role: Types.ObjectId | string | IRole;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export type UserWithToken = IUser & { token: string };
export default IUser;
