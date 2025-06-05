const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { belajar } = require('./logic/modules/learning');
const { enrichKeywords } = require('./logic/modules/semantic');
const { generateInfo } = require('./logic/modules/generator');
const { integrasiEksternal } = require('./logic/modules/integrator');
const adminAPI = require('./api/admin');

const app = express();
const PORT = 7000;

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data', 'kata.json');
let data = { entities: {}, fallback: [] };

function loadData() {
  try {
    const fileData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const mergedEntities = integrasiEksternal(fileData.entities || {});
    data = { ...fileData, entities: mergedEntities };
    console.log('✅ kata.json + data eksternal dimuat');
  } catch (err) {
    console.error('❌ Gagal memuat data:', err.message);
  }
}

function saveData() {
  const originalData = { ...data };
  delete originalData.entities; // Hanya simpan entitas lokal
  fs.writeFileSync(dataPath, JSON.stringify(originalData, null, 2), 'utf8');
}

loadData();

function getDynamicContent(type) {
  const now = new Date();
  if (type === 'waktu') {
    return `Sekarang pukul ${now.toLocaleTimeString('id-ID')}`;
  }
  if (type === 'tanggal') {
    return `Hari ini adalah ${now.toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    })}`;
  }
  return '';
}

function prosesPesan(pesan) {
  const input = pesan.toLowerCase();
  const hasil = [];

  for (const [entitas, konten] of Object.entries(data.entities)) {
    const allKeywords = enrichKeywords(konten.keywords || []);
    const ditemukan = allKeywords.find(keyword => input.includes(keyword));
    if (ditemukan) {
      if (konten.dynamic) {
        hasil.push(getDynamicContent(konten.dynamic));
      } else if (konten.info) {
        hasil.push(konten.info);
      } else {
        const autoInfo = generateInfo(entitas, konten.keywords || []);
        hasil.push(autoInfo);
      }
    }
  }

  if (hasil.length === 0) {
    belajar(pesan);
    const fallback = data.fallback || ["Maaf, saya belum mengerti maksudnya."];
    return fallback[Math.floor(Math.random() * fallback.length)];
  }

  return hasil.join(' ');
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Saipul AI aktif dan belajar mandiri' });
});

app.post('/chat', (req, res) => {
  const { message = '' } = req.body;
  const reply = prosesPesan(message);
  res.json({
    reply,
    timestamp: new Date().toISOString()
  });
});

app.use('/admin', adminAPI);

app.listen(PORT, () => {
  console.log(`🤖 Saipul AI aktif di http://localhost:${PORT}`);
});
