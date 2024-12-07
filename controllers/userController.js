import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userSchema.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const {
      firstName,
      lastName,
      email,
      countryCode,
      phoneNumber,
      password,
      dateOfBirth,
      gender,
    } = req.body;

    if (!firstName || !lastName || !email || !password ||!phoneNumber || !dateOfBirth || !gender ) {
        return res.status(400).json({ success:false, message: "All Fields are Required." });
      }

    // Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = {
      firstName,
      lastName,
      email,
      countryCode,
      phoneNumber,
      password: hashedPassword,
      dateOfBirth,
      gender,
    };
    await createUser(user);

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
