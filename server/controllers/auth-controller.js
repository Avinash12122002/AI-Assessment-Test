const User = require("../models/user-model");
const Contact = require("../models/contact-model"); 

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("Request Body:", req.body);

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new user for Postman
    const userCreated = await User.create({ name, email, password, role });
    console.log(userCreated);

    res.status(201).json({
      message: "Registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists in the database
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Handle HR users with plain text password
    if (userExists.role === "hr") {
      if (userExists.password === password) {
        // HR user login successful
        return res.status(200).json({
          message: "Login successful",
          token: await userExists.generateToken(),
          userId: userExists._id.toString(),
          role: userExists.role,
        });
      } else {
        // Invalid password for HR
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      // Handle Candidate users with hashed password
      const isValidPassword = await userExists.comparePassword(password);
      if (isValidPassword) {
        // Candidate user login successful
        return res.status(200).json({
          message: "Login successful",
          token: await userExists.generateToken(),
          userId: userExists._id.toString(),
          role: userExists.role,
        });
      } else {
        // Invalid password for candidate
        return res.status(401).json({ message: "Invalid email or password" });
      }
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Contact Us
const contactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Ensure the user is logged in before submitting contact
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "First you have to login" });
    }

    // Allow only candidates to send messages
    if (user.role !== "candidate") {
      return res
        .status(403)
        .json({ error: "Only candidates can send messages." });
    }

    const contactEntry = await Contact.create({ name, email, message });

    res.status(201).json({
      message: "Contact form submitted successfully",
      contactId: contactEntry._id,
    });
  } catch (error) {
    console.error("Contact Form Error:", error);
    res
      .status(500)
      .json({ message: "Server error while submitting contact form" });
  }
};


module.exports = {
  register,
  login,
  contactUs,
};
