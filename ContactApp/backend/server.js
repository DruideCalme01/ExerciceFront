const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const Port = 5000;

const contacts = [
    { id: 1, prenom: "Alice", nom: "Dupont", email: "alice@example.com", tel: "1234567890" },
    { id: 2, prenom: "Bob", nom: "Martin", email: "bob@example.com", tel: "0987654321" },
    { id: 3, prenom: "Charlie", nom: "Bernard", email: "charlie@example.com", tel: "1122334455" }
];

let id = 3;

app.get('/contacts', (req, res) => {
    res.json(contacts);
});

app.post('/contacts', (req, res) => {
    const newContact = req.body;
    newContact.id = ++id;
    contacts.push(newContact);
    res.json(newContact);
});

app.put('/contacts/:id', (req, res) => {
    const contactId = parseInt(req.params.id);
    const index = contacts.findIndex(c => c.id === contactId);
    if (index === -1) {
        return res.status(404).json({ error: "Contact non trouvé" });
    }
    contacts[index] = { ...contacts[index], ...req.body };
    res.json(contacts[index]);
});

app.delete('/contacts/:id', (req, res) => {
    const contactId = parseInt(req.params.id);
    const index = contacts.findIndex(c => c.id === contactId);
    if (index === -1) {
        return res.status(404).json({ error: "Contact non trouvé" });
    }
    contacts.splice(index, 1);
    res.json({ message: "Contact supprimé" });
});

app.listen(Port, () => {
    console.log(`Serveur démarré sur le port ${Port}`);
});