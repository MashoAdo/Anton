import { TaskInterface } from "../interface";
import Product from "../models/product";

export default class DeleteProduct implements TaskInterface {
  public async run(id: string): Promise<void> {
    await Product.findByIdAndDelete(id);
  }
}
