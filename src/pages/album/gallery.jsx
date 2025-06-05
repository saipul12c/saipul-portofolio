import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import kenanganData from './json/gallery.json';

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMemories = kenanganData.filter((memory) =>
    memory.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-3">
          Galeri Kenangan
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Jelajahi berbagai momen berharga yang telah terekam dengan detail lengkap dan nuansa emosional.
        </p>

        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Cari kenangan berdasarkan judul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredMemories.length > 0 ? (
            filteredMemories.map((memory) => {
              const slug = slugify(memory.title);

              return (
                <Link key={memory.id} to={`/kenangan/${slug}`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-md hover:shadow-2xl dark:hover:shadow-xl transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {memory.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                          {memory.description}
                        </p>

                        {/* Tanggal & Lokasi */}
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                          <div>
                            {new Date(memory.date).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </div>
                          {memory.location && (
                            <div className="italic">Lokasi: {memory.location}</div>
                          )}
                        </div>

                        {/* Tags Preview */}
                        {memory.tags && memory.tags.length > 0 && (
                          <div className="mb-3 flex flex-wrap gap-2">
                            {memory.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-200 dark:bg-gray-700 text-xs text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                            {memory.tags.length > 3 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{memory.tags.length - 3} lainnya
                              </span>
                            )}
                          </div>
                        )}

                        {/* Rating */}
                        {memory.rating != null && (
                          <div className="mb-2 flex items-center">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span
                                key={i}
                                className={
                                  i < memory.rating
                                    ? 'text-yellow-500'
                                    : 'text-gray-300 dark:text-gray-600'
                                }
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Button Detail */}
                      <div className="mt-4">
                        <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                          Lihat Detail
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
              Tidak ada kenangan yang cocok dengan pencarian Anda.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
