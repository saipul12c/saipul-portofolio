// src/pages/About.jsx
import React from 'react';
import { FiTarget, FiCompass, FiUsers, FiCheckCircle } from 'react-icons/fi';

export default function About() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-800 dark:to-gray-700 opacity-50"></div>
        <div className="relative max-w-4xl mx-auto py-24 px-6 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
            Pekenalkan <span className="text-indigo-600 dark:text-indigo-400">Muhammad Syaiful Mukmin</span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Penulis berkomitmen untuk mengubah ide-ide kreatif Anda menjadi produk digital yang fungsional, indah, dan mudah diakses.
          </p>
          <a
            href="/kontak"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-lg transform hover:-translate-y-1 transition"
          >
            Hubungi Kami
          </a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Kenapa Memilih saipul?
        </h2>
        <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <FiCheckCircle className="h-10 w-10 mb-3 text-indigo-600 dark:text-indigo-400" />,
              title: 'Kualitas Terjamin',
              desc: 'Setiap produk diuji ketat sebelum dipublikasikan.',
            },
            {
              icon: <FiTarget className="h-10 w-10 mb-3 text-indigo-600 dark:text-indigo-400" />,
              title: 'Hasil Tepat Sasaran',
              desc: 'Solusi yang kami buat selalu sesuai kebutuhan Anda.',
            },
            {
              icon: <FiCompass className="h-10 w-10 mb-3 text-indigo-600 dark:text-indigo-400" />,
              title: 'Pendekatan Inovatif',
              desc: 'Kami terus berinovasi agar Anda selalu unggul.',
            },
            {
              icon: <FiUsers className="h-10 w-10 mb-3 text-indigo-600 dark:text-indigo-400" />,
              title: 'Profesional dan Trempil',
              desc: 'Kami punya tim ahli yang siap kami hadir untuk kesuksesan proyek Anda.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transform hover:-translate-y-2 transition"
            >
              <div className="flex flex-col items-center text-center">
                {item.icon}
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 bg-gradient-to-tr from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-5xl mx-auto grid gap-12 sm:grid-cols-2">
          {/* Mission */}
          <div className="flex flex-col items-center text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
            <FiTarget className="h-12 w-12 mb-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-2xl font-semibold mb-2">Misi Kami</h3>
            <p className="text-sm">
              Memberdayakan individu & bisnis dengan solusi digital inovatif, mudah digunakan, dan terjangkau.
            </p>
          </div>
          {/* Vision */}
          <div className="flex flex-col items-center text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
            <FiCompass className="h-12 w-12 mb-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-2xl font-semibold mb-2">Visi Kami</h3>
            <p className="text-sm">
              Menjadi pemimpin global dalam pengembangan produk digital yang memperkaya kehidupan pengguna.
            </p>
          </div>
        </div>
      </section>

      {/* Team Snapshot */}
      <section className="py-16 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Tim Hebat di Balik Layar
        </h2>
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transform hover:-translate-y-1 transition"
            >
              <div className="w-24 h-24 mb-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={`https://i.pravatar.cc/150?img=${idx * 10}`}
                  alt={`Team member ${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-semibold">Nama Anggota {idx}</h4>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">Posisi {idx}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-indigo-600 dark:bg-indigo-500 text-white text-center rounded-t-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Siap Bekerja Sama?</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Mari wujudkan proyek digital impian Anda bersama tim profesional kami.
        </p>
        <a
          href="/kontak"
          className="inline-block bg-white text-indigo-600 hover:bg-gray-100 dark:text-indigo-500 dark:hover:bg-indigo-100 px-8 py-3 rounded-lg shadow-lg transition transform hover:-translate-y-1"
        >
          Hubungi Sekarang
        </a>
      </section>
    </div>
  );
}