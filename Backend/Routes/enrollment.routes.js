import express from "express";
import {
  enrollInCourse,
  getCourseStudents,
  getMyEnrollments,
  updateMyProgress,
} from "../Controllers/enrollment.controller.js";
import { authorizeRoles, protect } from "../Middlewares/auth.middleware.js";
import asyncHandler from "../Middlewares/async.middleware.js";

const router = express.Router();

router.post("/:courseId", protect, authorizeRoles("student"), asyncHandler(enrollInCourse));
router.get("/me", protect, authorizeRoles("student"), asyncHandler(getMyEnrollments));
router.patch("/:enrollmentId/progress", protect, authorizeRoles("student"), asyncHandler(updateMyProgress));

router.get("/course/:courseId/students", protect, authorizeRoles("instructor"), asyncHandler(getCourseStudents));

export default router;
