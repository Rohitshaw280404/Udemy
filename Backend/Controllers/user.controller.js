import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";
import Educator from "../Models/educator.model.js";

const createToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email, and password are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists with this email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "student",
  });

  if (user.role === "instructor") {
    await Educator.create({ user: user._id });
  }

  const token = createToken(user._id);
  return res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = createToken(user._id);
  return res.status(200).json({
    message: "Login successful",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const getMe = async (req, res) => {
  const profile = await User.findById(req.user._id).select("-password");
  if (!profile) {
    return res.status(404).json({ message: "User not found" });
  }

  let educatorProfile = null;
  if (profile.role === "instructor") {
    educatorProfile = await Educator.findOne({ user: profile._id });
  }

  return res.status(200).json({
    user: profile,
    educatorProfile,
  });
};
