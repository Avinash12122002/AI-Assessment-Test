const Test = require("../models/test-model");
const Attempt = require("../models/attempt-model");

const createTest = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const test = new Test({
      title,
      description,
      questions,
      createdBy: req.user.userId,
    });
    await test.save();
    res.status(201).json({ message: "Test created successfully", test });
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ error: "Failed to create test" });
  }
};

const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find({ createdBy: req.user.userId });
    res.status(200).json({ tests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ error: "Failed to fetch tests" });
  }
};

const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    res.status(200).json({ test });
  } catch (error) {
    res.status(404).json({ error: "Test not found" });
  }
};

const submitAttempt = async (req, res) => {
  try {
    const attempt = new Attempt({
      testId: req.params.testId,
      candidateId: req.user.userId,
      answers: req.body.answers,
      score: req.body.score,
    });
    await attempt.save();
    res.status(201).json({ message: "Attempt submitted", attempt });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit attempt" });
  }
};

const getCandidateAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({ candidateId: req.params.candidateId }).populate("testId");
    res.status(200).json({ attempts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attempts" });
  }
};

const getAllAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find().populate("testId candidateId");
    res.status(200).json({ attempts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attempts" });
  }
};
module.exports = {
  createTest,
  getAllTests, // ✅ needed for test-router.js
  getTestById,
  submitAttempt,
  getCandidateAttempts,
  getAllAttempts,
  getHrCreatedTests: getAllTests, // ✅ reused in HR dashboard
};

