import { Model, ProjectionType, QueryOptions, Schema, Types } from "mongoose";

import Permission from "@models/permission.model";
import Role from "@models/role.model";
import Service from "@models/service.model";
import ServiceLog from "@models/serviceLog.model";
import { ServiceRequest } from "@models/serviceRequest.model";
import { UserModel } from "@models/userModel";
import Vehicle from "@models/vehicle.model";
import {
  IPermission,
  IRole,
  IService,
  IServiceLog,
  IServiceRequest,
  IUser,
  IVehicle,
} from "@types";

type Where<T> = Partial<Record<keyof T, any>>;

export class BaseRepository<T> {
  constructor(private model: Model<T>) {}

  find(
    where: Where<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model.find(where, projection, options);
  }

  findOne(
    where: Where<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model.findOne(where, projection, options);
  }

  create(data: Partial<T>) {
    const doc = new this.model(data);
    return doc.save();
  }

  update(query: Where<T>, data: Partial<T>, options?: QueryOptions<T> | null) {
    return this.model.findOneAndUpdate(query, data, options);
  }

  delete(query: Where<T>) {
    return this.model.findByIdAndDelete(query);
  }

  count(query: Where<T>) {
    return this.model.countDocuments(query);
  }

  findById(
    id: string | Types.ObjectId,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model.findById(id, projection, options);
  }
}

export const roleService = new BaseRepository<IRole>(Role);
export const userService = new BaseRepository<IUser>(UserModel);
export const permissionService = new BaseRepository<IPermission>(Permission);
export const vehicleService = new BaseRepository<IVehicle>(Vehicle);
export const vehicleManagementService = new BaseRepository<IService>(Service);
export const serviceRequestService = new BaseRepository<IServiceRequest>(
  ServiceRequest,
);
export const serviceLogService = new BaseRepository<IServiceLog>(ServiceLog);
