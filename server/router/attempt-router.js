const express = require("express");
const router = express.Router();
const attemptController = require("../controllers/attempt-controller");
const authMiddleware = require("../middlewares/auth-middleware");

// Candidate attempts a test
router.post("/attempt", authMiddleware, attemptController.createAttempt);

// HR gets all attempts (dashboard)
router.get("/all", authMiddleware, attemptController.getAllAttemptsForHR);

// Candidate views their own attempts
router.get("/my", authMiddleware, attemptController.getCandidateAttempts);

module.exports = router;
