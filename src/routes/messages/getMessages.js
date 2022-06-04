const express = require("express");
const router = express.Router();
const db = require("../../db");
const app = express();

app.get("/", async (req, res) => {
    try {
        const response = await db.selectTable("message_flow");
        res.send(response);
    } catch (e) {
        res.json({ error: e.message });
    };
});

module.exports = router;