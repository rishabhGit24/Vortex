const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// POST /auth/register - Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, role, company } = req.body;

    // Validate required fields
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ error: "Email, password, and role are required" });
    }

    // For clients, company is required
    if (role === "client" && !company) {
      return res
        .status(400)
        .json({ error: "Company is required for client accounts" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const user = new User({
      email,
      password,
      role,
      company: role === "client" ? company : undefined,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        company: user.company,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// POST /auth/login - Login user
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT token with user info including company
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        company: user.company,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        company: user.company,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

module.exports = router;
