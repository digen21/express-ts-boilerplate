import { Schema } from "mongoose";
import IService from "./services.types";
import IUser from "./users.types";
import IVehicle from "./vehicles.types";

export enum ServiceRequestStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

interface IServiceRequest {
  vehicle: Schema.Types.ObjectId | IVehicle;
  service: Schema.Types.ObjectId | IService;
  assignedStaff?: Schema.Types.ObjectId | IUser;
  status: ServiceRequestStatus;
  _id: Schema.Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

export default IServiceRequest;
