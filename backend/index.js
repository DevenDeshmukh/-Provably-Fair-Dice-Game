const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Generate a random server seed
const serverSeed = crypto.randomBytes(32).toString("hex");

// Generate a hashed version of the server seed
const serverSeedHash = crypto.createHash("sha256").update(serverSeed).digest("hex");

// Route to get the hashed server seed
app.get("/seed", (req, res) => {
    res.json({ serverSeedHash });
});

// Dice roll route
app.post("/roll", (req, res) => {
    const { clientSeed } = req.body;

    if (!clientSeed) {
        return res.status(400).json({ error: "Client seed is required" });
    }

    const combinedSeed = serverSeed + clientSeed;
    const rollHash = crypto.createHash("sha256").update(combinedSeed).digest("hex");

    // Convert hash to a number between 1-6
    const rollValue = parseInt(rollHash.substring(0, 8), 16) % 6 + 1;

    res.json({ roll: rollValue });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log(`Server Seed: ${serverSeed}`);
console.log(`Server Seed Hash: ${serverSeedHash}`);
