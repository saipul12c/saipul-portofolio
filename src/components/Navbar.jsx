// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiInfo,
  FiStar,
  FiAward,
  FiBookOpen,
  FiMail,
  FiMoon,
} from 'react-icons/fi';
import { toggleTheme } from '../utils/theme';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home', icon: <FiHome className="inline mr-1" /> },
    { to: '/about', label: 'About', icon: <FiInfo className="inline mr-1" /> },
    { to: '/skills', label: 'Skills', icon: <FiStar className="inline mr-1" /> },
    { to: '/sertifikat', label: 'Sertifikat', icon: <FiAward className="inline mr-1" /> },
    { to: '/blog', label: 'Blog', icon: <FiBookOpen className="inline mr-1" /> },
    { to: '/kontak', label: 'Hubungi Admin', icon: <FiMail className="inline mr-1" /> },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <NavLink to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            MyLogo
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {links.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition ${
                    isActive ? 'font-semibold' : ''
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}

            {/* Simpel Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              aria-label="Toggle theme"
            >
              <FiMoon />
            </button>
          </div>

          {/* Mobile Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 pt-2 pb-4 space-y-2">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition ${
                  isActive ? 'font-semibold' : ''
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}

          {/* Simpel Theme Toggle */}
          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle theme"
          >
            <FiMoon />
          </button>
        </div>
      )}
    </nav>
  );
}
