const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { generateInfo } = require('../logic/modules/generator');

const file = path.join(__dirname, '../data/kata.json');

function loadData() {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function saveData(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

router.get('/entities', (req, res) => {
  const data = loadData();
  res.json(data.entities);
});

router.post('/entities', (req, res) => {
  const { name, keywords, info } = req.body;
  let data = loadData();
  if (data.entities[name]) return res.status(400).json({ error: 'Entitas sudah ada.' });

  data.entities[name] = {
    keywords,
    info: info || generateInfo(name, keywords),
    examples: [],
    learned: true
  };
  saveData(data);
  res.json({ message: 'Entitas ditambahkan.' });
});

router.put('/entities/:name', (req, res) => {
  const name = req.params.name;
  const { keywords, info } = req.body;
  let data = loadData();
  if (!data.entities[name]) return res.status(404).json({ error: 'Entitas tidak ditemukan.' });

  data.entities[name].keywords = keywords;
  data.entities[name].info = info || generateInfo(name, keywords);
  saveData(data);
  res.json({ message: 'Entitas diperbarui.' });
});

router.delete('/entities/:name', (req, res) => {
  const name = req.params.name;
  let data = loadData();
  if (!data.entities[name]) return res.status(404).json({ error: 'Tidak ditemukan.' });

  delete data.entities[name];
  saveData(data);
  res.json({ message: 'Entitas dihapus.' });
});

module.exports = router;
