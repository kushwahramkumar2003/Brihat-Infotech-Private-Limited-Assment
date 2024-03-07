import { Request, Response } from "express";
import z from "zod";
import getNewToken from "../utils/jwtToke";
import asyncHandler from "../utils/asynchHandler";
import bcrypt from "bcrypt";
import User from "../models/User";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: true,
};

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
  fullName: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

const LoginSchema = z.object({
  // email: z.string().email().optional(),
  password: z.string().min(8),
  username: z.string().min(3).optional(),
});

/***************************************
 * @kushwahramkumar2003
 * @api {post} /api/auth/register
 * @apiName signUp
 * @apiGroup Auth
 * @apiDescription Sign up a new user
 ****************************************/
export const signUp = asyncHandler(async (req: Request, res: Response) => {
  console.log("req.body -> ", req.body);
  const { email, password, username, avatarUrl, fullName } = SignUpSchema.parse(
    req.body
  );

  console.log("req.body2 -> ", req.body);

  console.log("email -> ", email);
  console.log("userName -> ", username);

  if (await User.findOne({ email: email })) {
    console.log("user email -> ", await User.findOne({ email: email }));
    throw new Error("Email already exists");
  }
  if (await User.findOne({ username: username })) {
    console.log("userName -> ", await User.findOne({ username: username }));
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(15));
  const user = await User.create({
    email,
    password: hashedPassword,
    username: username,
    fullName: fullName || "",
    avatarUrl: avatarUrl || "",
  });

  user.password = "";

  const token = await getNewToken(user._id.toString());

  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    message: "User created",
    user: {
      email: user.email,
      userName: user.username,
    },
  });
});

/**************************************
 * @kushwahramkumar2003
 * @api {post} /api/auth/login
 * @apiName login
 * @apiGroup Auth
 * @apiDescription Login a user
 ****************************************/
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = LoginSchema.parse(req.body);

  let user;

  if (username) {
    user = await User.findOne({ email: username });
    if (!user) {
      user = await User.findOne({ username: username });
    }
  }

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  user.password = "";

  const token = await getNewToken(user._id.toString());

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      email: user.email,
      username: user.username,
      name: user.fullName || "",
    },
  });
});

/**************************************
 * @kushwahramkumar2003
 * @api {get} /api/auth/logout
 * @apiName logout
 * @apiGroup Auth
 * @apiDescription Logout a user
 ****************************************/
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "User Logged out successfully" });
});

/**************************************
 * @kushwahramkumar2003
 * @api {get} /api/auth/user
 * @apiName getUser
 * @apiGroup Auth
 * @apiDescription Get user details
 ****************************************/

// export const updatePassword = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { id, password } = req.body;
//     if (!id || !password) {
//       throw new Error("Invalid request");
//     }

//     const hashedPassword = await bcrypt.hash(
//       password,
//       await bcrypt.genSalt(15)
//     );

//     const user = await prisma.user.update({
//       where: {
//         id,
//       },
//       data: {
//         password: hashedPassword,
//       },
//     });

//     if (!user) {
//       throw new Error("User not found");
//     }
//     user.password = "";

//     res.status(200).json({ message: "Password updated successfully" });
//   }
// );
