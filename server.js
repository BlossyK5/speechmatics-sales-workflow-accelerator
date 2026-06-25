import express from "express";
import multer from "multer";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import "dotenv/config";
import { fileURLToPath } from "node:url";

import { transcribeAudio } from "./services/transcribeAudio.js";
import { generateNotes } from "./services/generateNotes.js";
import { generateEmail } from "./services/generateEmail.js";

//const express = require("express");
//const multer = require("multer");
const OpenAI = import("openai");

// Add it HERE
function getPrompt(template, transcript) {
  const prompts = {
    meeting: `
You are an AI meeting assistant.
Create:
1. Summary
2. Key decisions
3. Action items
4. Follow-up email

Transcript:
${transcript}
`,

    sales: `
You are an AI sales call assistant.
Create:
1. Customer pain points
2. Buying signals
3. Objections
4. Next steps
5. Follow-up email

Transcript:
${transcript}
`,

    interview: `
You are an AI interview assistant.
Create:
1. Candidate summary
2. Strengths
3. Concerns
4. Recommended follow-up questions

Transcript:
${transcript}
`,

    lecture: `
You are an AI study assistant.
Create:
1. Main concepts
2. Key definitions
3. Examples
4. Revision notes

Transcript:
${transcript}
`
  };

  return prompts[template] || prompts.meeting;
}

const app = express();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.post("/process-audio", upload.single("audio"), async (req, res) => {

  

  try {

    const template = req.body.template || "meeting";
    
    console.log("Uploaded file:", req.file.path);

    
    const transcript = await transcribeAudio(req.file.path);
    console.log("Transcript generated");

    const prompt = getPrompt(template, transcript);

    const meetingNotes = await generateNotes(transcript);
    console.log("Meeting notes generated");

    const followUpEmail = await generateEmail(meetingNotes);
    console.log("Follow-up email generated");

    fs.writeFileSync("transcript.txt", transcript);
    fs.writeFileSync("meeting_notes.txt", meetingNotes);
    fs.writeFileSync("follow_up_email.txt", followUpEmail);

    res.json({
      transcript,
      meetingNotes,
      followUpEmail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Processing failed.",
      details: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Customer Call Copilot running at http://localhost:3000");
});


