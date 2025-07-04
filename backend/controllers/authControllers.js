import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    //validation
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    if (username.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 2 characters long",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "This username is already taken",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: hashedPassword,
      username: username,
    });

    if (newUser) {
      //generate jwt
      generateToken(newUser, res);
      await newUser.save();
      res.status(201).json({
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User not created",
      });
    }
  } catch (error) {
    console.log("Error in Signup", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No account found with this email address",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    generateToken(user, res);
    res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("Error in Login", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0,
    });
    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    console.log("Error in Logout", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProfile = async (req, res) => {
  //changed name from updateduser to user
  try {
    const { profilePicture } = req.body;
    const userid = req.user._id;

    if (!profilePicture) {
      return res.status(400).json({
        success: false,
        message: "Please provide a profile picture",
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePicture);
    const user = await User.findByIdAndUpdate(
      userid,
      {
        profilePicture: uploadResponse.secure_url,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Profile updated",
      user,
    });
  } catch (error) {
    console.log("Error in Update Profile", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log("Error in Check Auth", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
