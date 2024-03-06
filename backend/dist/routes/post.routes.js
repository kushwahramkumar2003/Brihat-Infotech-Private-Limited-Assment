"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postControllers_1 = require("../controllers/postControllers");
const router = (0, express_1.Router)();
router.post("/newPost", postControllers_1.createNewPost);
exports.default = router;
