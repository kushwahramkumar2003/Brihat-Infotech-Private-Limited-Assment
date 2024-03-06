import { Router } from "express";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";
import {
  extractUserMiddleware,
  rateLimitMiddleware,
} from "../middlewares/authMiddlewares";

const router = Router();

router.use("/auth", rateLimitMiddleware, authRoutes);
router.use("/post", rateLimitMiddleware, extractUserMiddleware, postRoutes);

export default router;
