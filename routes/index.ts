import { Request, Response, Router } from "express";
import productsRoutes from "../controllers/product";
import usersRoutes from "../controllers/user";

const router = Router();

router.use("/products", productsRoutes);
router.use("/users", usersRoutes);

export default router;
