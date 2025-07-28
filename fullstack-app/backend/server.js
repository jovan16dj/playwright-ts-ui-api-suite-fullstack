const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

let items = [];
let id    = 1;

function validateItem(req, res, next) {
  const { name } = req.body ?? {};
  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: '"name" must be a non‑empty string' });
  }
  req.body.name = name.trim();
  next();
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    return res.json({ message: 'Login successful' });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/items', (_req, res) => res.json(items));

app.post('/items', validateItem, (req, res) => {
  const item = { id: id++, name: req.body.name };
  items.push(item);
  res.status(201).json(item);
});

app.put('/items/:id', validateItem, (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const idx    = items.findIndex(i => i.id === itemId);
  if (idx === -1) {
    return res.status(404).json({ message: 'Not found' });
  }
  items[idx] = { id: itemId, name: req.body.name };
  res.json(items[idx]);
});

app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const idx    = items.findIndex(i => i.id === itemId);
  if (idx === -1) {
    return res.status(404).json({ message: 'Not found' });
  }
  items.splice(idx, 1);
  res.status(204).send();
});

app.get('/health', (_req, res) => res.sendStatus(200));

app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server running on http://0.0.0.0:${PORT}`)
);
