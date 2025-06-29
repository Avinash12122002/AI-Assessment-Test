const { z } = require("zod");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Signup schema for user registration
const signupSchema = z.object({
  name: z.string({ required_error: "Name is required" })
          .trim()
          .min(1, { message: "Name is required" })
          .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
          .trim()
          .regex(emailRegex, { message: "Invalid email format" })
          .max(50),
  password: z.string()
          .min(3)
          .max(50),
  role: z.enum(["hr", "candidate"]).default("candidate")  // ✅ ADD THIS
});



// Login schema for user login
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, { message: "Email is required" })
    .regex(emailRegex, { message: "Invalid email format" })
    .max(50, { message: "Email must be less than 50 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, { message: "Password must be at least 3 characters" })
    .max(50, { message: "Password must be less than 50 characters" }),
});

// Contact Us schema
const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, { message: "Email is required" })
    .regex(emailRegex, { message: "Invalid email format" }),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(1, { message: "Message cannot be empty" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

module.exports = {
  signupSchema,
  loginSchema,
  contactSchema,
};
