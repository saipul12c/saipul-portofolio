function findSimilarEntity(word, entities) {
  const similarity = (a, b) => {
    const match = [...a].filter(char => b.includes(char)).length;
    return match / Math.max(a.length, b.length);
  };

  let best = { entity: null, score: 0 };

  for (const [name, ent] of Object.entries(entities)) {
    const allKeywords = ent.keywords || [];
    for (const keyword of allKeywords) {
      const score = similarity(word, keyword);
      if (score > best.score) {
        best = { entity: name, score };
      }
    }
  }

  return best.score > 0.6 ? best.entity : null;
}

module.exports = { findSimilarEntity };
