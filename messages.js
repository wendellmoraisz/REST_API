const db = require("./db/db");

const messages = [
    {
        template_name: 'template1',
    },
    {
        template_name: 'template2',
    },
    {
        template_name: 'template3',
    },
    {
        template_name: 'template4',
    },
];

async function setMessages() {
    messages.map(async (message, index) => {
        await db.insertMessage({
            template_name: message.template_name,
            position: index + 1,
        });
    });
};

module.exports = { messages, setMessages };