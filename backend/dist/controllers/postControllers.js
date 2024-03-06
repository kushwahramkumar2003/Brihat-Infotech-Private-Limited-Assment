"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewPost = void 0;
const asynchHandler_1 = __importDefault(require("../utils/asynchHandler"));
const zod_1 = __importDefault(require("zod"));
const Post_1 = __importDefault(require("../models/Post"));
const PostSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    //   user: z.string(),
});
exports.createNewPost = (0, asynchHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = PostSchema.parse(req.body);
    const { user } = req.body;
    console.log("user -> ", user);
    const newPost = yield Post_1.default.create({
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
}));
