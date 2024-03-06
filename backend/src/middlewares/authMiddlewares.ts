import setRateLimit from "express-rate-limit";
import asyncHandler from "../utils/asynchHandler";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";
import { json } from "stream/consumers";

// Rate limit middleware
export const rateLimitMiddleware = setRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: "You have exceeded your 50 request in 10 min.",
  headers: true,
});

export const extractUserMiddleware = asyncHandler(
  async (req: Request, res: Response, next) => {
    // console.log("req.cookies --> ", req.cookies);
    if (req.cookies.token) {
      // console.log("req.cookies --> ", req.cookies);
      const token = req.cookies.token;
      const decodedToken = await jwt.decode(token);
      if (!decodedToken) {
        // res.status(401).json({ message: "Invalid token" });
      }
      const userId = JSON.parse(JSON.stringify(decodedToken)).userId;
      console.log("userId --> ", userId);
      if (!userId) {
        // res.status(401).json({ message: "Invalid token" });
      }
      const user = await User.findById({ _id: userId }, { password: 0 });

      // console.log("user --> ", user);

      if (!user) {
        // res.status(401).json({ message: "Invalid token" });
      }
      req.body.user = user;
    }
    next();
  }
);
