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
    origin: process.env.FRONTEND_URL, // Use an environment variable for flexibility
  })
);

app.use(express.json());

// A simple endpoint to check the server status
app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from Simple AI",
  });
});

// Route to handle requests from the frontend
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
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
