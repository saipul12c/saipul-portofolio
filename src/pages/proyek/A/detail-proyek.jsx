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
      <div className="p-8 text-center text-gray-600">
        Proyek tidak ditemukan.
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-4 py-12"
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center text-blue-600 hover:underline"
      >
        ← Kembali
      </button>

      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />

      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <div className="text-gray-800 leading-relaxed whitespace-pre-line">
        {project.details}
      </div>
    </motion.section>
  );
}
