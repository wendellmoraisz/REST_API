const express = require("express");
const router = express.Router();
const db = require("../../db");
const app = express();

router.get("/", async (req, res) => {
    try {
        const response = await db.selectTable("subscriptions");
        res.send(response);
    } catch (e) {
        res.json({ error: e.message });
    };
});

module.exports = router;