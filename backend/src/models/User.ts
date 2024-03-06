import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 8,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  avatarUrl: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
