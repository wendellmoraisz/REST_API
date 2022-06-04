require("dotenv").config();

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    global.connection = connection;
    console.log("Connected at MySQL");
    return connection;
};

async function selectTable(table) {
    const conn = await connect();
    const [rows] = await conn.query(`SELECT * FROM ${table}`);
    return rows;
};

async function insertMessage(msg) {
    const conn = await connect();
    const sql = "INSERT INTO message_flow (template_name, position) VALUES (?,?);";
    const values = [msg.template_name, msg.position];
    await conn.query(sql, values);
};

async function insertSubscription(user) {
    const conn = await connect();
    const sql = "INSERT INTO subscriptions (subscription_date, name, last_message, active) VALUES (?,?,?,?);";
    const values = [user.subscription_date, user.name, user.last_message, user.active];
    await conn.query(sql, values);
};

async function updateSubscription() {
    const conn = await connect();
    const messages = await selectTable('message_flow');
    const users = await selectTable('subscriptions');

    console.log('Updating subscriptions...');
    users.map(user => {
        if (user.last_message === messages.length) {
            conn.query(`UPDATE subscriptions SET active = false WHERE id = ${user.id}`);
        } else {
            conn.query(`UPDATE subscriptions SET last_message = ${user.last_message + 1} WHERE id = ${user.id}`);
        };
    });
    console.log("Subscriptions successfully updated");
};

module.exports = { selectTable, insertMessage, insertSubscription, updateSubscription };