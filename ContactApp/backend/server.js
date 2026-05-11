const express = require('express');
const app = express();
const Port = 5000;

const contacts = [
    { id: 1, prenom: "Alice", nom: "Dupont", email: "alice@example.com", tel: "1234567890" },
    { id: 2, prenom: "Bob", nom: "Martin", email: "bob@example.com", tel: "0987654321" },
    { id: 3, prenom: "Charlie", nom: "Bernard", email: "charlie@example.com", tel: "1122334455" }
];

app.get('/contacts', (req, res) => {
    res.json(contacts);
});

app.listen(Port, () => {
    console.log(`Serveur démarré sur le port ${Port}`);
});