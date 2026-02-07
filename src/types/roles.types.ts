import { Schema } from "mongoose";
import IPermission from "./permissions.types";

export enum Roles {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
  STAFF = "STAFF",
}

interface IRole {
  name: string;
  permissions: Schema.Types.ObjectId[] | IPermission[];
}

export default IRole;
