# Customer Call Copilot

An AI-powered customer call assistant that transforms raw customer conversations into structured business insights.

This project demonstrates how production-grade speech recognition can be combined with large language models to automate post-call workflows such as transcription, meeting notes, customer pain point extraction and follow-up email generation.

Built as a portfolio project to explore how AI infrastructure can power customer-facing applications.

---

## Overview

Customer Call Copilot enables users to upload an audio recording of a customer conversation and automatically generates:

* Accurate transcript
* Structured meeting notes
* Customer pain points
* Action items
* Next steps
* Sales follow-up email

The application combines Speechmatics' speech recognition capabilities with OpenAI's GPT models to produce business-ready outputs from natural conversations.

---
## Demo
You can watch a LIVE VIDEO Demonstration of this app [HERE](https://drive.google.com/file/d/1_GLNedsUVrtkUop6jPwvX370grG1PBS3/view?usp=sharing)

---

## Why I Built This

Sales representatives, customer success teams and account managers spend significant time manually documenting customer conversations after meetings.

This project explores how modern AI infrastructure can reduce that manual work by combining:

* Speech-to-text
* Prompt engineering
* Large language models
* Workflow automation

Rather than replacing people, the goal is to remove repetitive administrative work so teams can spend more time building customer relationships.

---

## Features

### Speech Recognition

* Upload customer call recordings
* Automatic transcription using the Speechmatics API
* Support for real-world conversations

### AI Analysis

Generate:

* Executive meeting summary
* Customer pain points
* Action items
* Next steps
* Follow-up email draft

### Workflow Tracking

Live progress tracker showing:

* Audio uploaded
* Speechmatics transcription
* AI meeting notes generation
* Email generation
* Ready for Gmail

### Modern UI

* Simple upload experience
* Clean business-focused interface
* Real-time processing feedback

---

## Technology Stack

### Frontend

* HTML
* CSS
* Vanilla JavaScript

### Backend

* Node.js
* Express
* Multer

### AI Services

* Speechmatics Realtime API
* OpenAI GPT-5.5

### Other

* REST APIs
* Multipart file uploads
* Environment variables
* Async JavaScript

---

## Architecture

```text
                Audio Upload
                      │
                      ▼
               Express Backend
                      │
                      ▼
          Speechmatics Speech API
                      │
                      ▼
                Raw Transcript
                      │
                      ▼
          OpenAI GPT-5.5 Analysis
                      │
        ┌─────────────┼──────────────┐
        ▼             ▼              ▼
 Meeting Notes   Action Items   Follow-up Email
                      │
                      ▼
              Customer Call Copilot UI
```

---

## Project Structure

```text
customer-call-copilot/

├── public/
│   ├── index.html
│   └── assets/
│
├── services/
│   ├── transcribeAudio.js
│   ├── generateNotes.js
│   └── generateEmail.js
│
├── uploads/
│
├── transcript.txt
├── meeting_notes.txt
├── follow_up_email.txt
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/yourusername/customer-call-copilot.git
```

Navigate into the project

```bash
cd customer-call-copilot
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```text
OPENAI_API_KEY=your_openai_key
SPEECHMATICS_API_KEY=your_speechmatics_key
```

Start the server

```bash
npm start
```

Open

```text
http://localhost:3000
```

---

## Workflow

1. Upload an audio recording
2. Speechmatics generates a transcript
3. GPT analyses the conversation
4. Meeting notes are generated
5. Follow-up email is drafted
6. Outputs are displayed in the UI


---

## Example Outputs

### Transcript

Accurate transcript of the uploaded customer conversation.

---

### Meeting Notes

* Executive summary
* Customer pain points
* Action items
* Next steps

---

### Follow-up Email

Professional customer email summarising:

* Discussion
* Agreed actions
* Next meeting
* Closing message

---

## Skills Demonstrated

* AI application development
* API integrations
* Speech AI
* LLM orchestration
* Prompt engineering
* Express.js
* JavaScript
* Backend development
* REST APIs
* File uploads
* Async programming
* Workflow automation
* UX design

---

## Future Improvements

* Real-time streaming transcription using WebSockets
* Speaker diarisation
* Editable AI outputs
* Download as PDF, Word or Markdown
* Multiple prompt templates (Sales, Interview, Lecture, Customer Support)
* CRM integrations
* Gmail API integration
* Meeting analytics dashboard
* Sentiment analysis
* CRM note generation
* Calendar integration

---

## Why Speechmatics?

This project intentionally uses Speechmatics as the speech recognition engine because of its focus on production-grade speech infrastructure.

Rather than building another transcription model, Speechmatics provides robust speech recognition infrastructure that developers can integrate into larger AI systems.

Customer Call Copilot demonstrates one example of how Speechmatics can serve as the speech layer within an AI-powered workflow.

---

## About Me

I'm Blossom Kafumbata, an engineer passionate about deploying AI systems that solve real business problems.

My interests sit at the intersection of:

* AI Deployment
* Solutions Engineering
* Enterprise AI
* Workflow Automation
* Applied Large Language Models

I'm particularly interested in building AI-powered products that integrate multiple services into seamless customer experiences.

---

## License

This project is released under the MIT License.
