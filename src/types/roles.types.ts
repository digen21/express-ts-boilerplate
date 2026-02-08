import { Schema } from "mongoose";
import IPermission from "./permissions.types";
import { Types } from "mongoose";

export enum Roles {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
  STAFF = "STAFF",
}

interface IRole {
  _id?: Types.ObjectId | string;
  name: Roles;
  description?: string;
  permissions: Schema.Types.ObjectId[] | IPermission[];
}

export default IRole;
