const express = require("express");
const Chat = require("../models/chat");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();


router.post("/", async (req, res) => {
    const { prompt, response } = req.body;

    if (!prompt || !response) {
        return res.status(400).json({ message: "Prompt and response are required." });
    }

    try {
        const newChat = new Chat({
            chatId: uuidv4(), // Generate a unique chat ID
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
        res.status(500).json({ message: "Error fetching chats", error: err.message });
    }
});

// Get all chats
router.get("/", async (req, res) => {
    try {
        const chats = await Chat.find();
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json({ message: "Error fetching chats", error: err.message });
    }
});


module.exports = router;
