import { Response, Request, Router } from "express";
import { SUCCESS_MESSAGE } from "../config/api-response";
import { ProductType } from "../interface";
import Product from "../models/product";
import CreateProduct from "../Tasks/create-product";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Product lists" });
});

router
  .route("/:id")
  .get((req: Request, res: Response) => {
    res.status(200).json({ message: `Product details id: ${req.params.id}` });
  })
  .post(async (req: Request, res: Response) => {
    const payload = req.body;

    try {
      const createdProduct = await new CreateProduct().run(payload);

      res.status(201).json({ product: createdProduct, success: true, success_message: SUCCESS_MESSAGE.PRODUCT_SUCCESSFULLY_CREATED });
    } catch (err) {
      //Type assertion
      const error = err as Error;

      return res.status(400).json({ success: false, success_message: SUCCESS_MESSAGE.FAILED_TO_CREATE_PRODUCT, error: error.message });
    }
  })
  .put((req: Request, res: Response) => {
    res.status(200).json({ message: "Product updated" });
  })
  .delete((req: Request, res: Response) => {
    res.status(200).json({ message: "Product deleted" });
  });

export default router;
