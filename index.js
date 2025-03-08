const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000; // Use environment variable PORT or default to 5000

// Middleware
app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// ✅ Root route (for basic testing)
app.get("/", (req, res) => {
  res.json({ message: "Hello from Blank API! 🚀 Your API is running!" });
});

// ✅ Example API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, this is an API endpoint!" });
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
