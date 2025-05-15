// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Branding */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
            Muhammad Syaiful Mukmin
          </h2>
          <p className="text-sm">
            Mewujudkan ide kreatif menjadi produk digital yang memukau dan fungsional.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/skills', label: 'Skills' },
              { to: '/sertifikat', label: 'Sertifikat' },
              { to: '/blog', label: 'Blog' },
              { to: '/kontak', label: 'Hubungi Admin' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
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
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} Muhamamd Syaiful Mukmin. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Made with ❤️ by MyBrand Team</p>
        </div>
      </div>
    </footer>
);
}
