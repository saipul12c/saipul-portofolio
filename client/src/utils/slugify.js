export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '') // Hapus karakter khusus
    .replace(/\s+/g, '-') // Ganti spasi dengan -
    .replace(/-+/g, '-'); // Hapus duplikat -
}
