// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Selamat Datang di <span className="text-indigo-600 dark:text-indigo-400">MyBrand</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl max-w-2xl">
          Kami membantu mewujudkan ide kreatif Anda menjadi produk digital yang memukau dan fungsional.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/about"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition"
          >
            Pelajari Lebih Lanjut
          </Link>
          <Link
            to="/kontak"
            className="px-6 py-3 border-2 border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium transition"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Fitur Utama Kami
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Desain Responsif',
              desc: 'Tampilan sempurna di berbagai perangkat, dari HP hingga desktop.',
              icon: (
                <svg className="h-10 w-10 mb-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              ),
            },
            {
              title: 'Dark & Light Mode',
              desc: 'Mudah beralih antara tema terang dan gelap sesuai preferensi.',
              icon: (
                <svg className="h-10 w-10 mb-4 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3.1a1 1 0 0 1 .993.883L13 4.1v1.8a1 1 0 0 1-1.993.117L11 5.9V4.1a1 1 0 0 1 1-1zM4.222 5.636a1 1 0 0 1 1.409-.074l.094.083L7 7.293a1 1 0 0 1-1.497 1.32l-.085-.094L4.222 6.05a1 1 0 0 1 0-1.414zM17.778 5.636a1 1 0 0 1 1.414 1.414l-1.276 1.276a1 1 0 0 1-1.497-1.32l.085-.094L17.778 5.636zM12 17.1a5.1 5.1 0 1 0 0-10.2 5.1 5.1 0 0 0 0 10.2z" />
                </svg>
              ),
            },
            {
              title: 'Support 24/7',
              desc: 'Tim kami siap membantu kapan saja Anda butuh.',
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
