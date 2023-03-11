import { Document } from "mongoose";
import { Request } from "express";

export interface ProductType extends Document {
  name: string;
  description: string;
  price: number;
  rating: number;
  discount_price: number;
  image_url: string;
  in_stock: boolean;
  sellers: Array<string>;
  sponsors: Array<string>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Number;
  updatedBy: Number;
}

export interface TaskInterface {
  run(...args: any): any;
}

export interface UserInterface {
  name?: string;
  email: string;
  password: string;
}

export interface AuthenticatedRequest extends Request {
  user?: any;
}
