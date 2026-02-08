import { Types } from "mongoose";

import { ServiceRequestStatus } from "./servicerequests.types";

interface IServiceLog {
  serviceRequest: Types.ObjectId;
  action: string;
  performedBy: Types.ObjectId;
  _id: Types.ObjectId;
  createdAt?: string;
  fromStatus?: ServiceRequestStatus;
  toStatus?: ServiceRequestStatus;
  updatedAt?: string;
}

export default IServiceLog;
