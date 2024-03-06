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
exports.extractUserMiddleware = exports.rateLimitMiddleware = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const asynchHandler_1 = __importDefault(require("../utils/asynchHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// Rate limit middleware
exports.rateLimitMiddleware = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 50,
    message: "You have exceeded your 50 request in 10 min.",
    headers: true,
});
exports.extractUserMiddleware = (0, asynchHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("req.cookies --> ", req.cookies);
    if (req.cookies.token) {
        // console.log("req.cookies --> ", req.cookies);
        const token = req.cookies.token;
        const decodedToken = yield jsonwebtoken_1.default.decode(token);
        if (!decodedToken) {
            // res.status(401).json({ message: "Invalid token" });
        }
        const userId = JSON.parse(JSON.stringify(decodedToken)).userId;
        console.log("userId --> ", userId);
        if (!userId) {
            // res.status(401).json({ message: "Invalid token" });
        }
        const user = yield User_1.default.findById({ _id: userId }, { password: 0 });
        // console.log("user --> ", user);
        if (!user) {
            // res.status(401).json({ message: "Invalid token" });
        }
        req.body.user = user;
    }
    next();
}));
