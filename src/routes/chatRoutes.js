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
    // Simulate a response based on the prompt and model
    const response = `This is a simulated response for the prompt: "${prompt}" using model: ${model}`;

    const newChat = new Chat({
      chatId: uuidv4(),
      prompt,
      response,
    });

    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ message: "Error saving chat", error: err.message });
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
