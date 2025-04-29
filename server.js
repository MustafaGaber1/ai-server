import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { OpenAI } from "openai";

dotenv.config();

const PORT = process.env.PORT || 5000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

// CORS setup - update with your frontend URL
app.use(
  cors({
    origin: "https://https://simple-ai-client.vercel.app/", // Replace with your actual frontend URL
  })
);

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from Simple AI",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    console.log("OpenAI Response:", response);

    res.status(200).send({
      bot: response.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port http://0.0.0.0:${PORT}`);
});
