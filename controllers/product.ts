import { Response, Request, Router } from "express";
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
    const { name, description, price, discount_price, rating, in_stock, sellers } = req.body;

    const product = new Product({ name, description, price, discount_price, rating, in_stock, sellers });

    try {
      product.validate();
      console.log("after-validate:", product);

      const createdProduct = await new CreateProduct().run(product);

      res.status(201).json({ product: createdProduct });
    } catch (err) {
      //Type assertion
      const error = err as Error;
      return res.status(400).json({ message: error.message });
    }
  })
  .put((req: Request, res: Response) => {
    res.status(200).json({ message: "Product updated" });
  })
  .delete((req: Request, res: Response) => {
    res.status(200).json({ message: "Product deleted" });
  });

export default router;
