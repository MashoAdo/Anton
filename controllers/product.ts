import { Response, Request, Router } from "express";
import { SUCCESS_MESSAGE } from "../config/api-response";
import { ProductType } from "../interface";

import CreateProduct from "../Tasks/create-product";
import DeleteProduct from "../Tasks/delete-product";
import GetProductDetails from "../Tasks/get-product-details";
import ListProducts from "../Tasks/list-products";
import UpdateProduct from "../Tasks/update-product";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const products = await new ListProducts().run();
  res.status(200).json({ success: true, success_message: SUCCESS_MESSAGE.PRODUCT_LIST, products });
});

router
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    const product_id = req.params.id;

    try {
      const product = await new GetProductDetails().run(product_id);
      res.status(200).json({ success: true, success_message: SUCCESS_MESSAGE.PRODUCT_DETAILS, product });
    } catch (error) {
      res.status(400).json({ success: false, success_message: SUCCESS_MESSAGE.PRODUCT_DETAILS_FAILED, error });
    }
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
  .put(async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;

    try {
      const updated = await new UpdateProduct().run({ id, ...payload });
      return res.status(201).json({ success: true, success_message: SUCCESS_MESSAGE.PRODUCT_UPDATED, product: updated });
    } catch (error) {
      return res.status(400).json({ success: false, success_message: SUCCESS_MESSAGE.FAILED_UPDATING_PRODUCT, error });
    }
  })
  .delete(async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await new DeleteProduct().run(id);
      res.status(200).json({ success: true, success_message: SUCCESS_MESSAGE.PRODUCT_DELETED });
    } catch (error) {
      res.status(400).json({ success: false, success_message: SUCCESS_MESSAGE.FAILED_DELETING_PRODUCT });
    }
  });

export default router;
