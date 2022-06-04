const express = require("express");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const db = require("./db");
const schedule = require("node-schedule");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// agendamento da atualização dos dados no banco
// ocorre todos os dias às 10:00
const job = schedule.scheduleJob('0 0 10 * * *', () => {
    db.updateSubscription();
});

app.post("/user", [
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

app.post("/messages", (req, res) => {
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

app.get("/users", async (req, res) => {
    try {
        const response = await db.selectTable("subscriptions");
        res.send(response);
    } catch (e) {
        res.json({ error: e.message });
    };
});

app.get("/messages", async (req, res) => {
    try {
        const response = await db.selectTable("message_flow");
        res.send(response);
    } catch (e) {
        res.json({ error: e.message });
    };
});

app.listen(3001, () => {
    console.log(`Server is running at http://localhost:3001`);
});