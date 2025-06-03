const express = require('express');
const multer = require('multer');
const { geminiAPI } = require('../config/gemini');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  const { uid } = req.body;
  const file = req.file;
  try {
    // Simulate reading file content (replace with actual file reading logic)
    const analysis = await geminiAPI(`Analyze this legal document: [Content from ${file.originalname}]`);
    res.json({ analysis });
  } catch (error) {
    res.status(500).send('Error analyzing document');
  }
});

module.exports = router;