require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET;

const users = []; 
const articles = [];
let articleIdCounter = 1;

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
  users.push({ id: Date.now(), email, password: hashedPassword });
  res.json({ message: "OK" });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
    return res.json({ token, email: user.email });
  }
  res.status(401).json({ error: 'Identifiants invalides' });
});


app.get('/articles', (req, res) => res.json(articles));

app.get('/articles/:id', (req, res) => {
  const art = articles.find(a => a.id === parseInt(req.params.id));
  art ? res.json(art) : res.status(404).send();
});

app.post('/articles', requireAuth, (req, res) => {
  const newArt = { id: ++articleIdCounter, ...req.body, authorId: req.user.userId, authorName: req.user.email, date: new Date().toLocaleDateString() };
  articles.push(newArt);
  res.json(newArt);
});

app.put('/articles/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id);
  const index = articles.findIndex(a => a.id === id && a.authorId === req.user.userId);
  if (index !== -1) {
    articles[index] = { ...articles[index], ...req.body };
    return res.json(articles[index]);
  }
  res.status(403).send();
});

app.delete('/articles/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id);
  const index = articles.findIndex(a => a.id === id && a.authorId === req.user.userId);
  if (index !== -1) {
    articles.splice(index, 1);
    return res.json({ message: "Supprimé" });
  }
  res.status(403).send();
});

app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));