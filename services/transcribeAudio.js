import { spawn } from "node:child_process";
import { createSpeechmaticsJWT } from "@speechmatics/auth";
import { RealtimeClient } from "@speechmatics/real-time-client";

export async function transcribeAudio(audioFilePath) {
  const apiKey = process.env.SPEECHMATICS_API_KEY;
  const client = new RealtimeClient();
  let fullTranscript = "";

  const audio_format = {
    type: "raw",
    encoding: "pcm_s16le",
    sample_rate: 44100,
  };

  return new Promise(async (resolve, reject) => {
    try {
      client.addEventListener("receiveMessage", ({ data }) => {
        if (data.message === "AddTranscript") {
          const transcript = data.metadata?.transcript;
          if (transcript) fullTranscript += transcript + " ";
        }

        if (data.message === "EndOfTranscript") {
          resolve(fullTranscript.trim());
        }

        if (data.message === "Error") {
          reject(new Error(`Speechmatics error: ${data.reason}`));
        }
      });

      const jwt = await createSpeechmaticsJWT({ type: "rt", apiKey, ttl: 60 });

      await client.start(jwt, {
        transcription_config: {
          language: "en",
          max_delay: 0.7,
          enable_partials: true,
        },
        audio_format,
      });

      const fileReader = spawn("sox", [
        audioFilePath,
        "-q",
        "-r", String(audio_format.sample_rate),
        "-e", "signed-integer",
        "-b", "16",
        "-c", "1",
        "-t", "raw",
        "-",
      ]);

      fileReader.stdout.on("data", (chunk) => {
        client.sendAudio(chunk);
      });

      fileReader.stderr.on("data", (d) => {
        console.error(`sox: ${d}`);
      });

      fileReader.on("close", async () => {
        await client.stopRecognition({ noTimeout: true });
      });

      fileReader.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
}