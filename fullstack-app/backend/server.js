const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
let items = [];
let id = 1;
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
app.get('/items', (req, res) => res.json(items));
app.get('/health', (_req, res) => res.sendStatus(200));
app.post('/items', (req, res) => {
  const item = { id: id++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const idx = items.findIndex(i => i.id === itemId);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  items[idx] = { id: itemId, ...req.body };
  res.json(items[idx]);
});
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const idx = items.findIndex(i => i.id === itemId);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  items.splice(idx,1);
  res.status(204).send();
});
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT}`));