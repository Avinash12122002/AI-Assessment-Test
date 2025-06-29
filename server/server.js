require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routers
const authRouter = require("./router/auth-router");
const testRouter = require("./router/test-router");
const attemptRouter = require("./router/attempt-router");
const hrRouter = require("./router/hr-router");

// Middlewares
const errorMiddleware = require("./middlewares/error-middleware");

// Initialize express app
const app = express();

// Middleware setup
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/tests", testRouter);
app.use("/api/attempts", attemptRouter);
app.use("/api/hr", hrRouter);

// Global error handler
app.use(errorMiddleware);

// Server port
const PORT = process.env.PORT || 8080;

// ✅ Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Server started at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
