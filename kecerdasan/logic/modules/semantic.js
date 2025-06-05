const sinonimMap = {
  "cuaca": ["hujan", "panas", "cerah", "mendung"],
  "waktu": ["jam", "detik", "pukul", "sekarang"],
  "ai": ["kecerdasan buatan", "machine learning", "otomatisasi"]
};

function enrichKeywords(keywords) {
  const enriched = new Set(keywords);
  for (const key of keywords) {
    if (sinonimMap[key]) {
      sinonimMap[key].forEach(word => enriched.add(word));
    }
  }
  return Array.from(enriched);
}

module.exports = { enrichKeywords };
