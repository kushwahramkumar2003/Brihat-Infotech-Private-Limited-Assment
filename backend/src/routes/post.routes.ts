import { Router } from "express";
import { createNewPost, getAllPosts } from "../controllers/postControllers";

const router = Router();

router.post("/newPost", createNewPost);
router.get("/", getAllPosts);

export default router;
