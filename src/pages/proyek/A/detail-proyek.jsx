// src/pages/proyek/A/detail-proyek.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import proyekData from '../../../data/proyek.json';

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function DetailProyek() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = proyekData.find((p) => slugify(p.title) === slug);

  if (!project) {
    return (
      <div className="p-8 text-center text-gray-600 dark:text-gray-400">
        Proyek tidak ditemukan.
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Kembali
        </button>

        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
        />

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h1>

        {project.projectStage && (
          <p className="text-sm text-green-600 dark:text-green-400 mb-2">
            Status: {project.projectStage}
          </p>
        )}
        {project.developmentPeriod && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Periode: {project.developmentPeriod}
          </p>
        )}

        <section className="text-gray-800 dark:text-gray-200 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p>{project.overview}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Latar Belakang</h2>
            <p>{project.background}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Tujuan</h2>
            <p>{project.objectives}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Teknologi yang Digunakan</h2>
            <ul className="list-disc list-inside">
              {project.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Fitur Utama</h2>
            <ul className="list-disc list-inside">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Manfaat</h2>
            <p>{project.benefits}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Kelebihan</h2>
            <p>{project.strengths}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Kekurangan</h2>
            <p>{project.limitations}</p>
          </div>

          {project.deploymentUrl && (
            <div>
              <h2 className="text-xl font-semibold">Demo / Deployment</h2>
              <a
                href={project.deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Lihat Situs
              </a>
            </div>
          )}
        </section>
      </div>
    </motion.section>
  );
}
