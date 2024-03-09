import { Request, Response } from "express";
import asyncHandler from "../utils/asynchHandler";
import z from "zod";
import Post from "../models/Post";

const PostSchema = z.object({
  title: z.string(),
  content: z.string(),
  imageUrl: z.string().optional(),
});

export const createNewPost = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, content, imageUrl } = PostSchema.parse(req.body);

    const { user } = req.body;
    console.log("user -> ", user);

    const newPost = await Post.create({
      title,
      content,
      imageUrl: imageUrl || "",
      user: user._id,
    });

    if (!newPost) {
      res.status(500).json({ message: "Post not created" });
    }

    res.status(201).json({
      message: "Post created",
      post: {
        title: newPost.title,
        content: newPost.content,
        imageUrl: newPost.imageUrl,
      },
    });
  }
);

export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const size = parseInt(req.query.size as string) || 10;

  console.log("page -> ", req.query.page);
  console.log("size -> ", req.query.size);

  const limit = size;
  const skip = (page - 1) * size;

  const total = await Post.countDocuments({});

  const posts = await Post.find({})
    .populate("user", ["username", "avatarUrl", "fullName", "createdAt"])
    .limit(limit)
    .skip(skip);

  res.status(200).json({
    totalItems: total,
    totalPages: Math.ceil(total / size),
    currentPage: page,
    posts: posts,
  });
});
