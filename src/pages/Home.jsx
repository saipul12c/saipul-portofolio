// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
        >
          Halo, Saya <span className="text-indigo-600 dark:text-indigo-400">Muhammad Syaiful Mukmin</span>
        </motion.h1>
        <p className="mt-4 text-lg sm:text-xl max-w-2xl">
          Front-End Developer berpengalaman 5+ tahun. Spesialis React & Next.js — menciptakan antarmuka interaktif yang efisien & estetis.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/about"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition"
          >
            Tentang Saya
          </Link>
          <Link
            to="/proyek"
            className="px-6 py-3 border-2 border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium transition"
          >
            Lihat Proyek
          </Link>
        </div>
      </section>

      {/* Highlight Komitmen */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Komitmen Saya</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Keamanan Data',
              color: '#E53E3E',
              desc: 'Melindungi privasi dan keamanan data pengguna secara profesional.',
            },
            {
              title: 'Kualitas Informasi',
              color: '#3182CE',
              desc: 'Menyajikan informasi yang akurat & terpercaya dengan audit berkala.',
            },
            {
              title: 'Etika & Profesionalisme',
              color: '#D53F8C',
              desc: 'Bekerja dengan integritas, keadilan, dan akuntabilitas penuh.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-white dark:bg-gray-900 shadow-md rounded-2xl text-center border-t-4" style={{ borderColor: item.color }}>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Keunggulan Saya
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'UI/UX Modern',
              desc: 'Mengutamakan kenyamanan pengguna dengan desain modern dan intuitif.',
              icon: (
                <svg className="h-10 w-10 mb-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              ),
            },
            {
              title: 'Responsive & Aksesibel',
              desc: 'Optimasi untuk semua perangkat dengan standar aksesibilitas tinggi.',
              icon: (
                <svg className="h-10 w-10 mb-4 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3.1a1 1 0 0 1 .993.883L13 4.1v1.8a1 1 0 0 1-1.993.117L11 5.9V4.1a1 1 0 0 1 1-1zM4.222 5.636a1 1 0 0 1 1.409-.074l.094.083L7 7.293a1 1 0 0 1-1.497 1.32l-.085-.094L4.222 6.05a1 1 0 0 1 0-1.414z" />
                </svg>
              ),
            },
            {
              title: 'Dukungan 24/7',
              desc: 'Respons cepat untuk semua kebutuhan pengguna dan kolaborator.',
              icon: (
                <svg className="h-10 w-10 mb-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.36 5.64a9 9 0 1 1-12.72 0M12 9v4l2 2" />
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex flex-col items-center text-center">
                {item.icon}
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
