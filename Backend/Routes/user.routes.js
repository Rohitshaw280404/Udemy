import express from "express";
import { getMe, loginUser, registerUser } from "../Controllers/user.controller.js";
import { protect } from "../Middlewares/auth.middleware.js";
import asyncHandler from "../Middlewares/async.middleware.js";

const router = express.Router();

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.get("/me", protect, asyncHandler(getMe));

export default router;
