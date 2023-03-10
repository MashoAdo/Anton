import mongoose, { isValidObjectId } from "mongoose";
import { ProductType } from "../interface";

const { Schema } = mongoose;

const productSchema = new Schema<ProductType>(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    description: {
      type: String,
      required: false,
      maxLength: 250,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount_price: {
      type: Number,
      required: false,
      default: null,
      min: 0,
    },
    image_url: {
      type: String,
      required: false,
      default: "",
    },
    rating: {
      type: Number,
      required: false,
      default: null,
      min: 0,
      max: 5,
    },
    in_stock: {
      type: Boolean,
      required: true,
      default: null,
    },
    sellers: {
      type: [String], // or type: Array
      required: false,
      default: [],
    },
    sponsors: {
      type: [String],
      required: false,
      default: [],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User", //This should reference the User model or collection
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User", //This should reference the User model or collection
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<ProductType>("Product", productSchema);

export default Product;
