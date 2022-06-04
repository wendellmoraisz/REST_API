const express = require("express");
const bodyParser = require("body-parser");
const schedule = require("node-schedule");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const getUsers = require("./routes/users/getUsers");
const setUser = require("./routes/users/setUser");
const setMessages = require("./routes/messages/setMessages")
const getMessages = require("./routes/messages/getMessages");

app.use("/user", setUser);
app.use("/users", getUsers);
app.use("/messages", setMessages);
app.use("/messages", getMessages);

// agendamento da atualização dos dados no banco
// ocorre todos os dias às 10:00
const job = schedule.scheduleJob('0 0 10 * * *', () => {
    db.updateSubscription();
});

app.listen(3001, () => {
    console.log(`Server is running at http://localhost:3001`);
});