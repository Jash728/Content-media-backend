// Import statements for ESM
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import fetch from "node-fetch"; // Import `node-fetch` correctly for ESM

// Initialize environment variables and database connection
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.post("/api/proxy/generate", async (req, res) => {
    const { model, prompt } = req.body;

    if (!model || !prompt) {
        console.error("Missing model or prompt in request body");
        return res.status(400).json({ message: "Model and prompt are required." });
    }

    try {
        console.log("Forwarding request to Ollama API with payload:", { model, prompt });

        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model, prompt }),
        });

        const responseBody = await response.text(); // Simplify response handling

        if (!response.ok) {
            console.error("Error from Ollama API:", response.status, responseBody);
            return res.status(response.status).json({
                message: "Error from Ollama API",
                details: responseBody,
            });
        }

        res.status(200).json({ result: responseBody });
    } catch (error) {
        console.error("Internal Server Error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});



// Add chat routes
app.use("/api/chats", chatRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
