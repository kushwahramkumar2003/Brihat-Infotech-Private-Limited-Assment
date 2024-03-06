import dotenv from "dotenv";
dotenv.config();

const config = {
  db: {
    url: process.env.DB_URL || "mongodb://localhost:27017/users",
  },
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || "secret",
};

export default config;
