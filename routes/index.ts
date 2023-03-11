import { Router } from "express";
import productsRoutes from "../controllers/product";
import usersRoutes from "../controllers/user";
import AuthMiddleware from "../middleware/auth";

const router = Router();

router.use("/users", usersRoutes);
router.use(AuthMiddleware);
router.use("/products", productsRoutes);

export default router;
