const express = require("express");
const router = express.Router();
const db = require("../../db");
const { body, validationResult } = require("express-validator");
const app = express();

router.post("/user", [
    body("name").isEmail(), // verificação do email
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
        await db.insertSubscription({
            subscription_date: date,
            name: req.body.name,
            last_message: null,
            active: true,
        });
        res.json({ status: 200, message: "successful registration" });
    } catch (e) {
        res.json({ error: e.message });
    };
});

module.exports = router;