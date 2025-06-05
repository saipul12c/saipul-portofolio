function generateInfo(entityName, keywords) {
  const kata = keywords?.length ? keywords.join(', ') : 'tidak diketahui';
  return `Topik "${entityName}" berkaitan dengan ${kata}. Kamu tertarik membahasnya lebih lanjut?`;
}

module.exports = { generateInfo };
