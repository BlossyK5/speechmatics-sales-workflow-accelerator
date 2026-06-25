import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmail(meetingNotes) {
  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: `
You are a sales assistant.

Using the meeting notes below, draft a professional follow-up email from the salesperson to the customer.

Return only the email draft.

Meeting notes:
${meetingNotes}
`,
  });

  return response.output_text;
}