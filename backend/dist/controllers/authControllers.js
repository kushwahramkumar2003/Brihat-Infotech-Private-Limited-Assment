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
exports.logout = exports.login = exports.signUp = void 0;
const zod_1 = __importDefault(require("zod"));
const jwtToke_1 = __importDefault(require("../utils/jwtToke"));
const asynchHandler_1 = __importDefault(require("../utils/asynchHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: true,
};
const SignUpSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    userName: zod_1.default.string().min(3),
    fullName: zod_1.default.string().optional(),
    avatarUrl: zod_1.default.string().url().optional(),
});
const LoginSchema = zod_1.default.object({
    email: zod_1.default.string().email().optional(),
    password: zod_1.default.string().min(8),
    userName: zod_1.default.string().min(3).optional(),
});
/***************************************
 * @kushwahramkumar2003
 * @api {post} /api/auth/register
 * @apiName signUp
 * @apiGroup Auth
 * @apiDescription Sign up a new user
 ****************************************/
exports.signUp = (0, asynchHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, userName, avatarUrl, fullName } = SignUpSchema.parse(req.body);
    console.log("email -> ", email);
    console.log("userName -> ", userName);
    if (yield User_1.default.findOne({ email: email })) {
        console.log("user email -> ", yield User_1.default.findOne({ email: email }));
        throw new Error("Email already exists");
    }
    if (yield User_1.default.findOne({ userName: userName })) {
        console.log("userName -> ", yield User_1.default.findOne({ userName: userName }));
        throw new Error("Username already exists");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, yield bcrypt_1.default.genSalt(15));
    const user = yield User_1.default.create({
        email,
        password: hashedPassword,
        username: userName,
        fullName: fullName || "",
        avatarUrl: avatarUrl || "",
    });
    user.password = "";
    const token = yield (0, jwtToke_1.default)(user._id.toString());
    res.cookie("token", token, cookieOptions);
    res.status(201).json({
        message: "User created",
        user: {
            email: user.email,
            userName: user.username,
        },
    });
}));
/**************************************
 * @kushwahramkumar2003
 * @api {post} /api/auth/login
 * @apiName login
 * @apiGroup Auth
 * @apiDescription Login a user
 ****************************************/
exports.login = (0, asynchHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, userName } = LoginSchema.parse(req.body);
    let user;
    if (email) {
        user = yield User_1.default.findOne({ email });
    }
    else if (userName) {
        user = yield yield User_1.default.findOne({ username: userName });
    }
    if (!user) {
        throw new Error("Invalid userName or password");
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    user.password = "";
    const token = yield (0, jwtToke_1.default)(user._id.toString());
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            email: user.email,
            userName: user.username,
            name: user.fullName || "",
        },
    });
}));
/**************************************
 * @kushwahramkumar2003
 * @api {get} /api/auth/logout
 * @apiName logout
 * @apiGroup Auth
 * @apiDescription Logout a user
 ****************************************/
exports.logout = (0, asynchHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token", cookieOptions);
    res.status(200).json({ message: "User Logged out successfully" });
}));
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
