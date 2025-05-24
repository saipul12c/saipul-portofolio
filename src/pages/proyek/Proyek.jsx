import React, { useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = proyekData.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-3">
          Daftar Proyek Saya
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Jelajahi berbagai proyek yang telah saya kembangkan dengan teknologi modern, solusi nyata, dan semangat inovatif.
        </p>

        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Cari proyek berdasarkan judul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => {
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
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                          {project.overview}
                        </p>

                        {project.technologies && (
                          <div className="mb-3 flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map((tech, index) => (
                              <span
                                key={index}
                                className="bg-gray-200 dark:bg-gray-700 text-xs text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{project.technologies.length - 3} lainnya
                              </span>
                            )}
                          </div>
                        )}

                        {project.projectStage && (
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            Status: {project.projectStage}
                          </span>
                        )}
                        {project.developmentPeriod && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Periode: {project.developmentPeriod}
                          </p>
                        )}
                      </div>

                      <div className="mt-4">
                        <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                          Lihat Detail
                        </span>
                        {project.deploymentUrl && (
                          <a
                            href={project.deploymentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 inline-block text-sm text-blue-500 hover:underline"
                          >
                            Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
              Tidak ada proyek yang cocok dengan pencarian Anda.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
