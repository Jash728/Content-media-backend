import express from "express";
import Chat from "../models/chat.js";
import { v4 as uuidv4 } from "uuid";


const uniqueId = uuidv4();


const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt, response } = req.body;

  if (!prompt || !response) {
    return res
      .status(400)
      .json({ message: "Prompt and response are required." });
  }

  try {
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

export default router;
