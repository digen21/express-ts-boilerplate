import { Types } from "mongoose";
import { Roles } from "./roles.types";
import { ServiceRequestStatus } from "./servicerequests.types";

export interface FSMInput {
  currentStatus: ServiceRequestStatus;
  nextStatus: ServiceRequestStatus;
  role: Roles;
  currentAssignedStaff?: Types.ObjectId;
  staffId?: Types.ObjectId;
  actorId: Types.ObjectId;
}

export interface FSMContext {
  currentStatus: ServiceRequestStatus;
  nextStatus: ServiceRequestStatus;
  role: Roles;
  actorId: Types.ObjectId;
  staffId?: Types.ObjectId;
  currentAssignedStaff?: Types.ObjectId;
  requestConfirmedAt?: Date;
  requestSentAt?: Date;
  
}

export interface FSMResult {
  status: ServiceRequestStatus;
  assignedStaff?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  lastUpdatedAt?: Date;
}

export type TransitionRule = {
  from: ServiceRequestStatus;
  to: ServiceRequestStatus;
  allowedRoles: Roles[];
  onTransition?: (ctx: FSMContext) => Partial<FSMResult>;
};
