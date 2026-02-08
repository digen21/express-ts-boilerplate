import { Types } from "mongoose";

export enum ServiceRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  DELIVERED = "DELIVERED",
}

interface IServiceRequest {
  vehicle: Types.ObjectId;
  customer: Types.ObjectId;
  createdBy?: Types.ObjectId; // service creator / requester
  updatedBy: Types.ObjectId; // updating the user
  service: Types.ObjectId; // worker
  assignedStaff?: Types.ObjectId;
  status: ServiceRequestStatus;
  _id: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
  lastUpdatedAt?: Date;
  isDeleted?: boolean;
  deletedAt?: Date;
  deletedBy?: Types.ObjectId;
  requestConfirmedAt?: Date;
  requestSentAt?: Date;
}

export default IServiceRequest;
