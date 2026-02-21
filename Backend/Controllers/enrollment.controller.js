import Course from "../Models/course.model.js";
import Enrollment from "../Models/enrollment.model.js";

export const enrollInCourse = async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const existingEnrollment = await Enrollment.findOne({
    student: req.user._id,
    course: courseId,
  });

  if (existingEnrollment) {
    return res.status(400).json({ message: "Already enrolled in this course" });
  }

  const enrollment = await Enrollment.create({
    student: req.user._id,
    course: courseId,
  });

  course.studentsCount += 1;
  await course.save();

  return res.status(201).json({ message: "Enrollment successful", enrollment });
};

export const getMyEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user._id })
    .populate({
      path: "course",
      populate: { path: "instructor", select: "name email" },
    })
    .sort({ createdAt: -1 });

  return res.status(200).json({ count: enrollments.length, enrollments });
};

export const updateMyProgress = async (req, res) => {
  const { enrollmentId } = req.params;
  const { progress } = req.body;

  if (progress === undefined || Number.isNaN(Number(progress))) {
    return res.status(400).json({ message: "progress is required and must be a number" });
  }

  const clampedProgress = Math.max(0, Math.min(100, Number(progress)));

  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found" });
  }

  if (enrollment.student.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You can only update your own progress" });
  }

  enrollment.progress = clampedProgress;
  await enrollment.save();

  return res.status(200).json({ message: "Progress updated successfully", enrollment });
};

export const getCourseStudents = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You can only view students in your own courses" });
  }

  const enrollments = await Enrollment.find({ course: courseId })
    .populate("student", "name email")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    course: { _id: course._id, title: course.title },
    count: enrollments.length,
    enrollments,
  });
};
