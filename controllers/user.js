import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const postUser = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.status(200)
      .send({ message: "User data saved successfully!", user: savedUser });
  } catch (err) {
    console.error("Error saving user data:", err);
    res.status(500)
      .json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const data = {
      username: user.username,
      password: user.password
    }
    const token = jwt.sign(data, jwtSecretKey);
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({
      message: "Login successful",
      Token: token,
      Data: user
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500)
      .json({ error: error.message });
  }
};

export const getsingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500)
      .json({ error: error.message });
  }
};


