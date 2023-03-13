import { TaskInterface } from "../interface";
import Product from "../models/product";

export default class ListProducts implements TaskInterface {
  public async run() {
    return await Product.find();
  }
}
