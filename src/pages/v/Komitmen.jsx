import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import komitmenData from '../../data/komitmen.json';

const Komitmen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [commitments, setCommitments] = useState([]);

  useEffect(() => {
    const darkMode = localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (komitmenData.commitments) setCommitments(komitmenData.commitments);
  }, []);

  const categories = ['Semua', ...new Set(commitments.map(c => c.category))];

  const filtered = commitments
    .filter(c =>
      (categoryFilter === 'Semua' || c.category === categoryFilter) &&
      c.statement.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.priority.score - a.priority.score);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-tr from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 transition-colors">
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold mb-4 lg:mb-0">
          Komitmen Kami
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Cari komitmen..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-40 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {filtered.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map(c => (
            <motion.div
              key={c.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  #{c.id}
                </span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {c.priority.label}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {c.category}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {c.statement}
              </p>
              <span className={`inline-block px-3 py-1 text-xs font-medium uppercase rounded-full
                ${c.status === 'Aktif' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                  c.status === 'Berjalan' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                  'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'}`.trim()}
              >
                {c.status}
              </span>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">Tidak ada komitmen yang sesuai.</p>
      )}
    </div>
  );
};

export default Komitmen;
