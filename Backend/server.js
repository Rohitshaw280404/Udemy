import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./Config/db.js";
import { errorHandler, notFound } from "./Middlewares/error.middleware.js";
import courseRoutes from "./Routes/course.routes.js";
import enrollmentRoutes from "./Routes/enrollment.routes.js";
import userRoutes from "./Routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Udemy backend API is running" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is missing in environment variables");
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing in environment variables");
    process.exit(1);
  }

  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
