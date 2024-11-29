const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config(); 
connectDB(); 

const app = express();


app.use(bodyParser.json());
app.use(cors());


app.use("/api/chats", chatRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
