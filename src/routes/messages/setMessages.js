const express = require("express");
const router = express.Router();
const db = require("../../db");
const app = express();

router.post("/messages", (req, res) => {
    try {
        req.body.messages.map((message, index) => {
            db.insertMessage({
                template_name: message.template_name,
                position: index + 1,
            });
        });
        res.json({ status: 200, message: "messages registered successfully" })
    } catch (e) {
        res.json({ error: e.message });
    };
});

module.exports = router;