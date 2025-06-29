const User = require("../models/user-model");
const Test = require("../models/test-model");

// ✅ GET /api/hr/monitor - Fetch candidates for monitoring
const getMonitoredTests = async (req, res) => {
  try {
    const candidates = await User.find({ role: "candidate" }).select("-password");
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching monitored candidates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ POST /api/hr/create-test - Save AI-created test
const createTest = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      questions,
      duration,
      accessType,
      passingScore,
      enableProctoring,
    } = req.body;

    const createdBy = req.user._id; // from authMiddleware

    const newTest = new Test({
      title,
      description,
      category,
      questions,
      duration,
      accessType,
      passingScore,
      enableProctoring,
      createdBy,
    });

    await newTest.save();

    res.status(201).json({ message: "Test created successfully", test: newTest });
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  console.log("🧪 Received test creation request:", req.body);
console.log("👤 HR ID:", req.user._id);

};


// ✅ GET /api/hr/my-tests - Get all tests created by the HR
const getHrCreatedTests = async (req, res) => {
  try {
    const tests = await Test.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tests);
  } catch (error) {
    console.error("Error fetching HR tests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getMonitoredTests,
  createTest,
  getHrCreatedTests,
};
