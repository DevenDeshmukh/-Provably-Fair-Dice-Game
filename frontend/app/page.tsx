"use client";
import { useState } from "react";

export default function Home() {
    const [clientSeed, setClientSeed] = useState("");
    const [serverSeedHash, setServerSeedHash] = useState("Loading...");
    const [result, setResult] = useState(null);
    const [rolling, setRolling] = useState(false);

    const fetchServerSeed = async () => {
        try {
            const response = await fetch("http://localhost:5001/seed");
            if (!response.ok) throw new Error("Server responded with an error");
            const data = await response.json();
            setServerSeedHash(data.serverSeedHash);
        } catch (error) {
            console.error("Error fetching server seed:", error);
            alert("Failed to fetch server seed. Make sure the backend is running.");
        }
    };

    const rollDice = async () => {
        if (!clientSeed) return alert("Enter a client seed!");

        setRolling(true);

        try {
            const response = await fetch("http://localhost:5001/roll", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ clientSeed }),
            });

            if (!response.ok) throw new Error("Failed to roll dice");
            const data = await response.json();
            setResult(data.roll);
        } catch (error) {
            console.error("Error rolling dice:", error);
            alert("Failed to roll dice.");
        }

        setTimeout(() => setRolling(false), 1000);
    };

    return (
        <div className="container">
            <h1 className="title">🎲 Provably Fair Dice Game 🎲</h1>
            
            <div className="game-container">
                <p className="server-seed">Server Seed Hash: {serverSeedHash}</p>
                <button className="btn" onClick={fetchServerSeed}>Get Server Seed Hash</button>

                <input
                    type="text"
                    placeholder="Enter Client Seed"
                    value={clientSeed}
                    onChange={(e) => setClientSeed(e.target.value)}
                    className="input"
                />

                <button className="btn roll-btn" onClick={rollDice} disabled={rolling}>
                    {rolling ? "Rolling..." : "Roll Dice"}
                </button>

                {result !== null && (
                    <p className="result">🎲 You rolled a <span>{result}</span>!</p>
                )}
            </div>
        </div>
    );
}
