const Attempt = require("../models/attempt-model");

// Candidate submits an attempt
exports.createAttempt = async (req, res) => {
  try {
    const { testId, score } = req.body;

    const newAttempt = await Attempt.create({
      candidateId: req.user._id,
      testId,
      score,
      status: "completed",
      submittedAt: new Date()
    });

    res.status(201).json({ message: "Attempt submitted", data: newAttempt });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit attempt" });
  }
};

// HR gets all attempts
exports.getAllAttemptsForHR = async (req, res) => {
  try {
    if (req.user.role !== "hr") {
      return res.status(403).json({ error: "Access denied" });
    }

    const attempts = await Attempt.find()
      .populate("candidateId", "name email")
      .populate("testId", "title");

    res.status(200).json({ data: attempts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attempts" });
  }
};

// Candidate views own attempts
exports.getCandidateAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({ candidateId: req.user._id })
      .populate("testId", "title");

    res.status(200).json({ data: attempts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your attempts" });
  }
};
