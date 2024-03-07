import { Request, Response } from "express";
import asyncHandler from "../utils/asynchHandler";
import z from "zod";
import { TypeUser } from "../types/user";
import Post from "../models/Post";

const PostSchema = z.object({
  title: z.string(),
  content: z.string(),
  //   user: z.string(),
});

export const createNewPost = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, content } = PostSchema.parse(req.body);

    const { user } = req.body;
    console.log("user -> ", user);

    const newPost = await Post.create({
      title,
      content,
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
      },
    });
  }
);

export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await Post.find({}).populate("user", [
    "username",
    "avatarUrl",
    "fullName",
    "createdAt",
  ]);
  res.status(200).json(posts);
});
