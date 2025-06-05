const fs = require('fs');
const path = require('path');
const { findSimilarEntity } = require('./clustering');
const { generateInfo } = require('./generator');
const file = path.join(__dirname, '../../data/kata.json');

function loadData() {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function saveData(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

function belajar(pesan) {
  const kataBaru = pesan.toLowerCase().split(/\W+/);
  let data = loadData();
  let adaUpdate = false;

  for (const kata of kataBaru) {
    const dikenal = Object.values(data.entities).some(ent =>
      (ent.keywords || []).includes(kata)
    );
    if (!dikenal && kata.length > 3 && !data.entities[kata]) {
      const mirip = findSimilarEntity(kata, data.entities);
      if (mirip) {
        data.entities[mirip].keywords.push(kata);
        adaUpdate = true;
      } else {
        data.entities[kata] = {
          keywords: [kata],
          info: generateInfo(kata, [kata]),
          examples: [pesan],
          learned: true,
          pendingConfirmation: true
        };
        adaUpdate = true;
      }
    }
  }

  if (adaUpdate) saveData(data);
}

module.exports = { belajar };
