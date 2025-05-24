// src/pages/proyek/Proyek.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import proyekData from '../../data/proyek.json';

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function Proyek() {
  return (
    <section className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Daftar Proyek Saya
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {proyekData.map((project) => {
            const slug = slugify(project.title);
            return (
              <Link key={project.id} to={`/proyek/${slug}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-md hover:shadow-2xl dark:hover:shadow-xl transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Lihat Detail
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
