require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET;

const users = []; 
let todos = [];
let todoIdCounter = 1;

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Accès refusé' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide' });
  }
}


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
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
        res.json({ token, email: user.email });
    } else {
        res.status(401).json({ error: "Mot de passe incorrect" });
    }
});


app.get('/todos', requireAuth, (req, res) => {
    const userTodos = todos.filter(t => t.userId === req.user.id);
    res.json(userTodos);
});

app.post('/todos', requireAuth, (req, res) => {
    const newTodo = { 
        ...req.body, 
        id: ++todoIdCounter, 
        userId: req.user.id 
    };
    todos.push(newTodo);
    res.json(newTodo);
});

app.put('/todos/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id && t.userId === req.user.id);

    if (index === -1) return res.status(404).json({ error: "Tâche non trouvée" });

    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
});

app.delete('/todos/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id && t.userId === req.user.id);

    if (index === -1) return res.status(404).json({ error: "Tâche non trouvée" });

    todos.splice(index, 1);
    res.json({ message: "Supprimé" });
});

app.listen(PORT, () => {
    console.log(`Serveur sécurisé sur http://localhost:${PORT}`);
});