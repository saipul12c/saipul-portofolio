const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '../../data');

function loadJSON(fileName) {
  try {
    const fullPath = path.join(basePath, fileName);
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch (err) {
    console.error(`❌ Gagal baca ${fileName}:`, err.message);
    return null;
  }
}

function extractEntitiesFromFAQ(data) {
  const output = {};
  if (!data?.faq?.topics) return output;

  for (const topic of data.faq.topics) {
    for (const item of topic.items) {
      output[`faq-${item.id}`] = {
        keywords: item.tags || [],
        info: item.answer,
        examples: [item.question],
        learned: true
      };
    }
  }
  return output;
}

function extractEntitiesFromKomitmen(data) {
  const output = {};
  if (!data?.commitments) return output;

  for (const komit of data.commitments) {
    const id = `komitmen-${komit.id}`;
    output[id] = {
      keywords: [komit.category.toLowerCase(), ...komit.statement.split(/\W+/).slice(0, 5)],
      info: komit.statement,
      examples: [`Apa komitmen tentang ${komit.category}?`],
      learned: true
    };
  }
  return output;
}

function extractEntitiesFromProyek(data) {
  const output = {};
  for (const proyek of data) {
    const id = `proyek-${proyek.id}`;
    output[id] = {
      keywords: [
        proyek.title.toLowerCase(),
        ...(proyek.technologies || []).map(t => t.toLowerCase())
      ],
      info: proyek.overview,
      examples: [proyek.title],
      learned: true
    };
  }
  return output;
}

function extractEntitiesFromVersionLog(data) {
  const output = {};
  for (const versi of data) {
    const id = `versi-${versi.version}`;
    const keywords = [versi.version, ...versi.notes?.newFeatures || []];
    output[id] = {
      keywords: keywords.map(k => k.toLowerCase().split(/\W+/)).flat().filter(k => k.length > 3),
      info: `Fitur baru di versi ${versi.version}: ${versi.notes?.newFeatures?.join('; ')}`,
      examples: [`Apa yang baru di versi ${versi.version}?`],
      learned: true
    };
  }
  return output;
}

function integrasiEksternal(localEntities) {
  return {
    ...localEntities,
    ...extractEntitiesFromFAQ(loadJSON('FAQ.json')),
    ...extractEntitiesFromKomitmen(loadJSON('komitmen.json')),
    ...extractEntitiesFromProyek(loadJSON('proyek.json')),
    ...extractEntitiesFromVersionLog(loadJSON('aiVersion.json'))
  };
}

module.exports = { integrasiEksternal };
