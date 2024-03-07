"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1.default.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose_1.default.model("User", exports.userSchema);
exports.default = User;
