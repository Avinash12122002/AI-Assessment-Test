const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const {
  getMonitoredTests,
  createTest,
  getHrCreatedTests,
} = require("../controllers/hr-controller");

// ✅ Route to monitor candidates
router.get("/monitor", authMiddleware, getMonitoredTests);

// ✅ Route to save a test created by HR (including AI-generated)
router.post("/create-test", authMiddleware, createTest);

// ✅ Route to get tests created by this HR
router.get("/my-tests", authMiddleware, getHrCreatedTests);

module.exports = router;
