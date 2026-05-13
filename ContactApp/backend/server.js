const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const SECRET_KEY = "ta_cle_secrete_super_secure";

const users = []; 
let contacts = [
    { id: 1, prenom: "Alice", nom: "Dupont", userId: null }, // contacts publics ou sans proprio
];
let contactIdCounter = 1;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Accès refusé" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Token invalide" });
        req.user = user;
        next();
    });
};


app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), email, password: hashedPassword };
    users.push(newUser);
    res.status(201).json({ message: "Utilisateur créé !" });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé. Inscrivez-vous !" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, email: user.email });
    } else {
        res.status(401).json({ error: "Mot de passe incorrect" });
    }
});


app.get('/contacts', authenticateToken, (req, res) => {
    const userContacts = contacts.filter(c => c.userId === req.user.id);
    res.json(userContacts);
});

app.post('/contacts', authenticateToken, (req, res) => {
    const newContact = { 
        ...req.body, 
        id: ++contactIdCounter, 
        userId: req.user.id 
    };
    contacts.push(newContact);
    res.json(newContact);
});

app.put('/contacts/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const index = contacts.findIndex(c => c.id === id && c.userId === req.user.id);

    if (index === -1) return res.status(404).json({ error: "Contact non trouvé" });

    contacts[index] = { ...contacts[index], ...req.body };
    res.json(contacts[index]);
});

app.delete('/contacts/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const index = contacts.findIndex(c => c.id === id && c.userId === req.user.id);

    if (index === -1) return res.status(404).json({ error: "Contact non trouvé" });

    contacts.splice(index, 1);
    res.json({ message: "Supprimé" });
});

app.listen(PORT, () => {
    console.log(`Serveur sécurisé sur http://localhost:${PORT}`);
});