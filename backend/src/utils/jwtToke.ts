import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import { userSchema } from "../models/User";

export const getNewToken = async (userId: string) => {
  const token = jwt.sign({ userId: userId }, config.jwtSecret, {
    expiresIn: "7d",
  });
  return token;
};

export default getNewToken;
