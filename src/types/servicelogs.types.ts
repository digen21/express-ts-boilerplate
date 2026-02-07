import { Schema } from "mongoose";
import IServiceRequest from "./servicerequests.types";
import IUser from "./users.types";

interface IServiceLog {
  serviceRequest: Schema.Types.ObjectId | IServiceRequest;
  action: string;
  performedBy: Schema.Types.ObjectId | IUser;
  _id: Schema.Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

export default IServiceLog;