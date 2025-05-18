import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Search } from 'lucide-react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import faqData from '../../data/FAQ.json';
import { initTheme, toggleTheme } from '../../utils/theme';

const tagColors = [
  { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-800 dark:text-red-200' },
  { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-800 dark:text-blue-200' },
  { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-200' },
  { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-800 dark:text-yellow-200' },
  { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-800 dark:text-purple-200' }
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [openIds, setOpenIds] = useState([]);

  useEffect(() => {
    initTheme();
    setFilteredTopics(faqData.faq.topics);
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const topics = faqData.faq.topics
      .map(topic => {
        const items = topic.items.filter(item =>
          item.question.toLowerCase().includes(term) ||
          item.answer.toLowerCase().includes(term) ||
          item.tags.some(tag => tag.toLowerCase().includes(term))
        );
        return { ...topic, items };
      })
      .filter(topic => topic.items.length > 0);
    setFilteredTopics(topics);
  }, [searchTerm]);

  const toggleOpen = id => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-0">
          FAQ
        </h1>
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input
              type="text"
              placeholder="Cari pertanyaan atau jawaban..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {document.documentElement.classList.contains('dark') ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </button>
        </div>
      </header>

      {filteredTopics.length > 0 ? (
        filteredTopics.map(topic => (
          <section key={topic.topicId} className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center">
              {topic.name}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              {topic.description}
            </p>
            <motion.div layout className="space-y-4">
              {topic.items.map(item => {
                const isOpen = openIds.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-neutral-800 rounded-2xl shadow-md p-6 border border-neutral-200 dark:border-neutral-700"
                  >
                    <div
                      className="flex justify-between items-start cursor-pointer"
                      onClick={() => toggleOpen(item.id)}
                    >
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                        {item.question}
                      </h3>
                      <span className="ml-4 text-neutral-500 dark:text-neutral-400">
                        {isOpen ? <FiMinus size={18} /> : <FiPlus size={18} />}
                      </span>
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4"
                        >
                          <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                            {item.answer}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, idx) => {
                              const color = tagColors[idx % tagColors.length];
                              return (
                                <span
                                  key={idx}
                                  className={`${color.bg} ${color.text} px-3 py-1 text-xs font-medium rounded-full`}
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>
        ))
      ) : (
        <p className="text-neutral-600 dark:text-neutral-400">Tidak ada FAQ yang sesuai.</p>
      )}
    </div>
  );
};

export default FAQ;
