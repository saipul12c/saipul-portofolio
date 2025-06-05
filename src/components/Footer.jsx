// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiTwitter,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiFacebook,
  FiYoutube,
} from 'react-icons/fi';

export default function Footer() {
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/album', label: 'Album Saya', dev: true },
    { to: '/sertifikat', label: 'Sertifikat' },
    { to: '/blog', label: 'Blog' },
    { to: '/kontak', label: 'Hubungi Admin' },
    { to: '/release-notes', label: 'Release Notes' },
    { to: '/faq', label: 'FAQ' },
    { to: '/komitmen', label: 'Komitmen' },
    { to: '/proyek', label: 'Proyek', dev: true },
    { to: '/pendidikan', label: 'Pendidikan', dev: true },
    { to: '/testimoni', label: 'Testimoni', dev: true },
  ];

  return (
    <footer className="bg-gradient-to-r from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Branding */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
            Muhammad Syaiful Mukmin
          </h2>
          <div className="text-sm space-y-2">
            <p>
              Halo! Saya Muhammad Syaiful Mukmin, pengembang perangkat lunak yang hobinya mengubah kopi menjadi baris kode yang rapi dan terpercaya. Dengan lebih dari lima tahun pengalaman menaklukkan tantangan front-end, saya selalu berupaya membuat antarmuka semenarik filter kopi favorit Anda.
            </p>
            <p>
              Saat tidak sibuk menjelajah dunia digital, Anda mungkin menemukan saya bermain futsal atau menulis blog sambil menikmati es teh. Saya percaya kerja keras dipadu sedikit humor adalah resep sempurna untuk solusi profesional yang tetap menghibur.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {quickLinks.map(({ to, label, dev }) => (
              <div key={to} className="relative group">
                <Link
                  to={to}
                  className={`block py-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition ${
                    dev ? 'opacity-80 hover:opacity-100' : ''
                  }`}
                >
                  {label}
                </Link>
                {dev && (
                  <div className="absolute left-0 top-full mt-1 w-48 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Halaman ini sedang dalam perkembangan dan peningkatan
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com/username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-transform transform hover:-translate-y-1"
            >
              <FiTwitter className="h-6 w-6 text-gray-600 dark:text-gray-200 hover:text-white" />
            </a>
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-transform transform hover:-translate-y-1"
            >
              <FiGithub className="h-6 w-6 text-gray-600 dark:text-gray-200 hover:text-white" />
            </a>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-transform transform hover:-translate-y-1"
            >
              <FiLinkedin className="h-6 w-6 text-gray-600 dark:text-gray-200 hover:text-white" />
            </a>
            <a
              href="https://instagram.com/username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-transform transform hover:-translate-y-1"
            >
              <FiInstagram className="h-6 w-6 text-gray-600 dark:text-gray-200 hover:text-white" />
            </a>
            <a
              href="https://facebook.com/username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-transform transform hover:-translate-y-1"
            >
              <FiFacebook className="h-6 w-6 text-gray-600 dark:text-gray-200 hover:text-white" />
            </a>
            <a
              href="https://youtube.com/username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-transform transform hover:-translate-y-1"
            >
              <FiYoutube className="h-6 w-6 text-gray-600 dark:text-gray-200 hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} Muhammad Syaiful Mukmin. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Made with ❤️ by Saipul AI</p>
        </div>
      </div>
    </footer>
  );
}
