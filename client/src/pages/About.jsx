// src/pages/About.jsx
import React from 'react';
import { FiCheckCircle, FiLayers, FiCoffee, FiSmile } from 'react-icons/fi';

export default function About() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-800 dark:to-gray-700 opacity-40"></div>
        <div className="relative max-w-3xl mx-auto py-20 px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-snug">
            Hai, saya <span className="text-indigo-600 dark:text-indigo-400">Muhammad Syaiful Mukmin</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Front-end Developer & pecinta kopi ☕ — siap menghadirkan antarmuka yang fungsional, estetis, dan bikin senyum setiap kali scroll.
          </p>
          <a
            href="/kontak"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md transform hover:-translate-y-1 transition"
          >
            Ayo Ngopi Virtual
          </a>
        </div>
      </section>

      {/* Keunggulan Pribadi */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Keunggulan Saya
        </h2>
        <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2">
          {[
            {
              icon: <FiCheckCircle className="h-8 w-8 mb-2 text-indigo-600 dark:text-indigo-400" />,
              title: 'Akurat & Efisien',
              desc: 'Kode terstruktur rapi, minim bug, rancangan cepat tapi tak pernah asal-asalan.',
            },
            {
              icon: <FiLayers className="h-8 w-8 mb-2 text-indigo-600 dark:text-indigo-400" />,
              title: 'Responsif Total',
              desc: 'Website tampil optimal di ponsel, tablet, desktop, bahkan di layar senter sekalipun.',
            },
            {
              icon: <FiCoffee className="h-8 w-8 mb-2 text-indigo-600 dark:text-indigo-400" />,
              title: 'Sentuhan Kreatif',
              desc: 'Tidak sekadar fungsi—tampilan segar dan sedikit humor agar pengguna betah berlama-lama.',
            },
            {
              icon: <FiSmile className="h-8 w-8 mb-2 text-indigo-600 dark:text-indigo-400" />,
              title: 'Komunikasi Lancar',
              desc: 'Penjelasan jargon teknis saya sederhanakan, biar kamu paham tanpa harus googling berjam-jam.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition"
            >
              <div className="flex flex-col items-center text-center">
                {item.icon}
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-16 px-4 bg-gradient-to-tr from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-2">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Visi</h3>
            <p className="text-sm">
              Menghubungkan kreativitas dan teknologi untuk menciptakan pengalaman digital yang bermakna dan menyenangkan.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Misi</h3>
            <p className="text-sm">
              Mengembangkan solusi front-end yang mudah diakses, intuitif, dan penuh nilai tambah bagi pengguna.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Singkat */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Apa Kata Klien?
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-gray-600 dark:text-gray-300">
            “Kerja sama dengan Syaiful super lancar! Website kami jadi lebih interaktif, dan komentar ‘keren’ dari tim terus berdatangan.”  
            <footer className="mt-2 text-sm font-semibold">— Budi, CEO StartupXYZ</footer>
          </blockquote>
          <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-gray-600 dark:text-gray-300">
            “Desainnya simpel tapi elegan. Yang paling kocak, loading indicator kustomnya pakai animasi kopi tumpah!”  
            <footer className="mt-2 text-sm font-semibold">— Rina, Project Manager Kreatif</footer>
          </blockquote>
        </div>
      </section>

      {/* Ajakan Akhir */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Siap Wujudkan Proyek Anda?</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Jangan biarkan ide hebat Anda berhenti di kepala—saya siap membantu dari mockup hingga live di internet!
        </p>
        <a
          href="/kontak"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md transform hover:-translate-y-1 transition"
        >
          Hubungi Saya Sekarang
        </a>
      </section>
    </div>
  );
}
