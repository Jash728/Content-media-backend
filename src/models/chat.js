const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true, // Unique identifier for each chat session
    },
    prompt: {
        type: String,
        required: true, // User's input to the AI
    },
    response: {
        type: String,
        required: true, // AI's response to the prompt
    },
    date: {
        type: Date,
        default: Date.now, // Automatically set the timestamp
    },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
