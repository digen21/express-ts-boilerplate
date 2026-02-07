import { Schema } from "mongoose";

interface IService {
  name: string;
  description?: string;
  price: number;
  isActive: boolean;
  _id: Schema.Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

export default IService;