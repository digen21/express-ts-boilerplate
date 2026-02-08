import { Schema } from "mongoose";

interface IService {
  name: string;
  description?: string;
  price: number;
  isAvailable: boolean;
  currencyCode: string;
  isActive: boolean;
  _id: Schema.Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

export default IService;
