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
exports.getAllPosts = exports.createNewPost = void 0;
const asynchHandler_1 = __importDefault(require("../utils/asynchHandler"));
const zod_1 = __importDefault(require("zod"));
const Post_1 = __importDefault(require("../models/Post"));
const PostSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    imageUrl: zod_1.default.string().optional(),
});
exports.createNewPost = (0, asynchHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, imageUrl } = PostSchema.parse(req.body);
    const { user } = req.body;
    console.log("user -> ", user);
    const newPost = yield Post_1.default.create({
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
}));
exports.getAllPosts = (0, asynchHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the page and size parameters from the request query, or use default values
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    console.log("page -> ", req.query.page);
    console.log("size -> ", req.query.size);
    // calculate the limit and skip values
    const limit = size;
    const skip = (page - 1) * size;
    // get the total number of documents that match the query
    const total = yield Post_1.default.countDocuments({});
    // get the posts data with pagination and population
    const posts = yield Post_1.default.find({})
        .populate("user", ["username", "avatarUrl", "fullName", "createdAt"])
        .limit(limit)
        .skip(skip);
    // send the response with the posts data and pagination info
    res.status(200).json({
        totalItems: total,
        totalPages: Math.ceil(total / size),
        currentPage: page,
        posts: posts,
    });
}));
