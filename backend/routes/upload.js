const express = require("express");
const multer = require("multer");

const parseFile = require("../utils/parser");
const generateSummary = require("../services/aiService");
const sendEmail = require("../services/emailService");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {

  try {

    const email = req.body.email;
    const filePath = req.file.path;

    const salesData = await parseFile(filePath);

    const summary = await generateSummary(salesData);

    await sendEmail(email, summary);

    res.json({ message: "Summary sent to email" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

module.exports = router;