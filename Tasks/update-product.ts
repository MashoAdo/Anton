import { ProductType, TaskInterface } from "../interface";
import Product from "../models/product";

export default class UpdateProduct implements TaskInterface {
  public async run({ id, ...payload }: ProductType): Promise<void> {
    const exists = await Product.exists({ _id: id });
    if (!exists) {
      throw new Error(`Product with id ${id} does not exist`);
    }

    await Product.findByIdAndUpdate(id, { ...payload });
  }
}
