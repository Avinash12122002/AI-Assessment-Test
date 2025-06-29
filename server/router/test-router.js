const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const {
  createTest,
  getAllTests,
  getTestById,
  submitAttempt,
  getCandidateAttempts,
  getAllAttempts,
} = require("../controllers/test-controller");

router.post("/create", authMiddleware, createTest);
router.get("/", authMiddleware, getAllTests); // ← protected route
router.get("/:id", authMiddleware, getTestById);
router.post("/:testId/submit", authMiddleware, submitAttempt);
router.get("/candidate/:candidateId", authMiddleware, getCandidateAttempts);
router.get("/attempts/all", authMiddleware, getAllAttempts);

module.exports = router;

