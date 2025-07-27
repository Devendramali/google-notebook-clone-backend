const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });
let extractedText = "";

app.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    extractedText = pdfData.text;
    fs.unlinkSync(req.file.path);
    res.json({ message: "PDF parsed successfully", preview: extractedText.slice(0, 300) + "..." });
  } catch (error) {
    res.status(500).json({ error: "Failed to extract PDF text" });
  }
});

app.post("/gemini-chat", async (req, res) => {
  const { message } = req.body;

  const prompt = `
You are an assistant. Use the following PDF content to answer the user's question.

PDF Content:
${extractedText.slice(0, 10000)}

User's Question:
${message}
`;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply.";
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Gemini API error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
