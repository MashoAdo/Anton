import { ProductType, TaskInterface } from "../interface";
import Product from "../models/product";

export default class CreateProduct implements TaskInterface {
  public async run(data: ProductType): Promise<ProductType> {
    const product: ProductType = await new Product(data).save({ timestamps: true, validateBeforeSave: true });

    return product;
  }
}
