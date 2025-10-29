import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// User Registration API
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// User Login API
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (isPasswordCorrect) {
        const token = generateToken(existingUser._id);
        return res.json({ success: true, token });
      }
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Get User Data API
export const getUserData = async (req, res) => {
  try {
    const user = req.user;
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to get published images
export const getPublishedImages = async (req, res) => {
    try {
        const publishedImages = await Chat.aggregate([
            { $unwind: "$messages" },
            { $match: { "messages.isImage": true, "messages.isPublished": true } },
            { $project: { _id: 0, imageUrl: "$messages.content", userName: "$userName" } }
        ])
        res.json({success: true, images: publishedImages.reverse()})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
