import { ProductType, TaskInterface } from "../interface";
import Product from "../models/product";

export default class CreateProduct implements TaskInterface {
  public async run(data: ProductType): Promise<ProductType> {
    const product = await new Product(data).save();

    return product;
  }
}
