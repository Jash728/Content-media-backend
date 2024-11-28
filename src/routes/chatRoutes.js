const express = require("express");
const Chat = require("../models/chat");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Define POST route for /generate
router.post("/generate", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required." });
    }

    try {
        // Simulate AI response (replace with actual AI logic)
        const response = `This is a simulated response for the prompt: ${prompt}`;

        // Save the response to the database if necessary
        const newChat = new Chat({
            chatId: uuidv4(), // Generate a unique chat ID
            prompt,
            response,
        });

        await newChat.save();

        res.status(201).json({ response, chat: newChat });
    } catch (err) {
        res.status(500).json({ message: "Error generating response", error: err.message });
    }
});

// GET route to fetch all chats
router.get("/", async (req, res) => {
    try {
        const chats = await Chat.find();
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json({ message: "Error fetching chats", error: err.message });
    }
});

module.exports = router;
