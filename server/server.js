require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/db");
const router = require("./router/auth-router");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();

app.use(cors({ origin: "*", credentials: true }));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Routes
app.use("/api/auth", router);

// Global error handler
app.use(errorMiddleware);

// Get PORT from .env or default to 3000
const PORT = 3000;

// Database Connection & Server Start
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Failed:", err);
    process.exit(1); 
  });
