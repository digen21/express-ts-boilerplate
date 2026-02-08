import { Schema } from "mongoose";
import IUser from "./users.types";

interface IVehicle {
  customer: Schema.Types.ObjectId | IUser;
  createdBy: Schema.Types.ObjectId | IUser;
  vehicleNo: string;
  model: string;
  type: string;
  _id: Schema.Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

export default IVehicle;
