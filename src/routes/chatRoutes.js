const express = require("express");
const Chat = require("../models/chat");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { model, prompt } = req.body;

  if (!prompt || !model) {
    return res.status(400).json({ message: "Model and prompt are required." });
  }

  try {
    // Make an API request to the AI model to get a response based on the prompt
    // Replace with the actual AI API you're using (e.g., Ollama, OpenAI, etc.)
    const aiResponse = await fetch("http://localhost:11434/api/generate", {
      // Replace with actual API URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }), // Send the prompt to the AI model
    });

    const aiData = await aiResponse.json();

    if (!aiResponse.ok) {
      return res
        .status(aiResponse.status)
        .json({ message: "Error from AI model", error: aiData });
    }

    // Extract the response from the AI model (adjust according to actual API response structure)
    const responseText = aiData.response; // Modify according to the API's response structure

    // Save the chat to the database with the prompt and AI-generated response
    const newChat = new Chat({
      chatId: uuidv4(),
      prompt,
      response: responseText,
    });

    await newChat.save();

    res.status(201).json(newChat); // Return the saved chat data
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error generating response", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching chats", error: err.message });
  }
});

module.exports = router;
