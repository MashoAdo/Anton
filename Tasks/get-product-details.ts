import { TaskInterface } from "../interface";
import Product from "../models/product";

export default class GetProductDetails implements TaskInterface {
  public async run(product_id: string) {
    return await Product.findById(product_id);
  }
}
