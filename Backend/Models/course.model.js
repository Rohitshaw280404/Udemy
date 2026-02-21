import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: true, timestamps: true },
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    duration: { type: String, default: "TBD" },
    description: { type: String, required: true, trim: true },
    price: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    studentsCount: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lectures: [lectureSchema],
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
