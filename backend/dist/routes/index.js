"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const post_routes_1 = __importDefault(require("./post.routes"));
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = (0, express_1.Router)();
router.use("/auth", authMiddlewares_1.rateLimitMiddleware, auth_routes_1.default);
router.use("/post", authMiddlewares_1.rateLimitMiddleware, authMiddlewares_1.AuthMiddleware, authMiddlewares_1.extractUserMiddleware, post_routes_1.default);
exports.default = router;
