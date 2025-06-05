import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import kenanganData from './../json/gallery.json';

// Fungsi slugify sama seperti di Gallery.jsx
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Render rating dengan bintang (★ = terisi, ☆ = kosong)
const renderStars = (rating) => {
  const maxStars = 5;
  const filled = '★'.repeat(rating);
  const empty = '☆'.repeat(maxStars - rating);
  return (
    <span className="text-yellow-500 text-lg">
      {filled}
      {empty}
    </span>
  );
};

// Format tanggal ke format Indonesia (contoh: 20 Juni 2023)
const formatDate = (isoDate) => {
  const tgl = new Date(isoDate);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return tgl.toLocaleDateString('id-ID', options);
};

// Emoji cuaca sederhana
const weatherIcons = {
  Cerah: '☀️',
  'Hujan gerimis': '🌦️',
  Mendung: '☁️',
  Berawan: '⛅',
  Berkabut: '🌫️',
};

export default function MemoryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Cari Kenangan yang cocok dengan slug
  const memory = kenanganData.find((item) => slugify(item.title) === slug);

  if (!memory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Kenangan Tidak Ditemukan
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Maaf, kenangan yang Anda cari tidak ada. Mungkin sudah dihapus atau URL salah.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Kembali ke Galeri
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header: Gambar & Tombol Kembali */}
        <div className="relative h-64 sm:h-80 md:h-96">
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full hover:bg-opacity-75 transition"
          >
            ← Kembali
          </button>
        </div>

        {/* Konten Utama */}
        <div className="p-6 space-y-6">
          {/* Judul */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {memory.title}
          </h1>

          {/* Deskripsi Penuh */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {memory.description}
          </p>

          {/* Detail Info dalam Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            <div className="space-y-4">
              {/* Tanggal */}
              <div>
                <span className="font-semibold">Tanggal:</span>{' '}
                {formatDate(memory.date)}
              </div>

              {/* Lokasi */}
              {memory.location && (
                <div>
                  <span className="font-semibold">Lokasi:</span>{' '}
                  {memory.location}
                </div>
              )}

              {/* Kategori */}
              <div>
                <span className="font-semibold">Kategori:</span>{' '}
                {memory.category}
              </div>

              {/* Rating */}
              {memory.rating != null && (
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Rating:</span>
                  {renderStars(memory.rating)}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Cuaca */}
              {memory.weather && (
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Cuaca:</span>
                  <span className="mr-1 text-xl">
                    {weatherIcons[memory.weather] || '❓'}
                  </span>
                  <span>{memory.weather}</span>
                </div>
              )}

              {/* Orang */}
              {memory.people && memory.people.length > 0 && (
                <div>
                  <span className="font-semibold">Orang:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {memory.people.map((person, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1 rounded-lg"
                      >
                        {person}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Emosi */}
              {memory.emotions && memory.emotions.length > 0 && (
                <div>
                  <span className="font-semibold">Emosi:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {memory.emotions.map((emo, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs px-3 py-1 rounded-lg"
                      >
                        {emo}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {memory.tags && memory.tags.length > 0 && (
            <div>
              <span className="font-semibold">Tags:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {memory.tags.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-3 py-1 rounded-lg"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Catatan Tambahan */}
          {memory.notes && (
            <div className="text-gray-600 dark:text-gray-400 italic">
              <span className="font-semibold">Catatan:</span> {memory.notes}
            </div>
          )}

          {/* Tombol Eksternal jika Ada */}
          {memory.externalUrl && (
            <div className="pt-4">
              <a
                href={memory.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition"
              >
                Kunjungi Link Terkait
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
