import { Router } from "express";
import { createNewPost } from "../controllers/postControllers";

const router = Router();

router.post("/newPost", createNewPost);

export default router;
