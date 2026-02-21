import Course from "../Models/course.model.js";
import Enrollment from "../Models/enrollment.model.js";

export const createCourse = async (req, res) => {
  const payload = { ...req.body, instructor: req.user._id };
  const course = await Course.create(payload);
  return res.status(201).json({ message: "Course created successfully", course });
};

export const getAllCourses = async (req, res) => {
  const { category, level, featured, q } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (level) filter.level = level;
  if (featured !== undefined) filter.featured = featured === "true";
  if (q) filter.title = { $regex: q, $options: "i" };

  const courses = await Course.find(filter)
    .populate("instructor", "name email")
    .sort({ createdAt: -1 });

  return res.status(200).json({ count: courses.length, courses });
};

export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id).populate("instructor", "name email");
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  return res.status(200).json({ course });
};

export const getMyInstructorCourses = async (req, res) => {
  const courses = await Course.find({ instructor: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json({ count: courses.length, courses });
};

export const updateCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You can only update your own courses" });
  }

  Object.assign(course, req.body);
  const updatedCourse = await course.save();
  return res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
};

export const deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You can only delete your own courses" });
  }

  await Enrollment.deleteMany({ course: course._id });
  await course.deleteOne();
  return res.status(200).json({ message: "Course deleted successfully" });
};

export const addLecture = async (req, res) => {
  const { title, videoUrl, description } = req.body;
  if (!title || !videoUrl || !description) {
    return res.status(400).json({ message: "title, videoUrl, and description are required" });
  }

  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You can only add lectures to your own courses" });
  }

  course.lectures.push({ title, videoUrl, description });
  await course.save();
  return res.status(200).json({ message: "Lecture added successfully", course });
};

export const removeLecture = async (req, res) => {
  const { id, lectureId } = req.params;
  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You can only remove lectures from your own courses" });
  }

  const lecture = course.lectures.id(lectureId);
  if (!lecture) {
    return res.status(404).json({ message: "Lecture not found" });
  }

  lecture.deleteOne();
  await course.save();
  return res.status(200).json({ message: "Lecture removed successfully", course });
};
