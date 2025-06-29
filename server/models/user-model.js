const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["hr", "candidate"],
    default: "candidate",
  },
});

// ✅ Skip hashing for HR
userSchema.pre("save", async function (next) {
  const user = this;

  // If password is already hashed or user is HR, skip hashing
  if (!user.isModified("password") || user.role === "hr") {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, salt);
    user.password = hash_password;
    next();
  } catch (error) {
    console.error("Hashing Error:", error);
    return next(error);
  }
});

// 🔐 Compare password (only needed for candidates; works for HR too)
userSchema.methods.comparePassword = async function (inputPassword) {
  if (this.role === "hr") {
    // Direct string comparison for HR
    return inputPassword === this.password;
  } else {
    // Bcrypt comparison for candidates
    return bcrypt.compare(inputPassword, this.password);
  }
};

// 🔑 Generate JWT token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        name: this.name,
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.error(error);
    return error;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
