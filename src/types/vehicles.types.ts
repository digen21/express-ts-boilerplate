import { Schema } from "mongoose";
import IUser from "./users.types";

interface IVehicle {
  userId: Schema.Types.ObjectId | IUser;
  regNumber: string;
  model: string;
  type: string;
  _id: Schema.Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

export default IVehicle;