import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  getMyInstructorCourses,
  removeLecture,
  updateCourse,
} from "../Controllers/course.controller.js";
import { authorizeRoles, protect } from "../Middlewares/auth.middleware.js";
import asyncHandler from "../Middlewares/async.middleware.js";

const router = express.Router();

router.get("/", asyncHandler(getAllCourses));
router.get("/instructor/mine", protect, authorizeRoles("instructor"), asyncHandler(getMyInstructorCourses));
router.get("/:id", asyncHandler(getCourseById));

router.post("/", protect, authorizeRoles("instructor"), asyncHandler(createCourse));
router.put("/:id", protect, authorizeRoles("instructor"), asyncHandler(updateCourse));
router.delete("/:id", protect, authorizeRoles("instructor"), asyncHandler(deleteCourse));

router.post("/:id/lectures", protect, authorizeRoles("instructor"), asyncHandler(addLecture));
router.delete(
  "/:id/lectures/:lectureId",
  protect,
  authorizeRoles("instructor"),
  asyncHandler(removeLecture),
);

export default router;
