import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateNotes(transcript) {
  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: `
You are a customer call copilot.

Read the transcript below and produce structured meeting notes.

Return the answer in exactly this format:

SUMMARY:
...

PAIN POINTS:
- ...

ACTION ITEMS:
- ...

NEXT STEPS:
- ...

Transcript:
${transcript}
`,
  });

  return response.output_text;
}
