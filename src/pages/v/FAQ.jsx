import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import faqData from '../../data/FAQ.json';

const tagColors = [
  { bg: 'bg-red-200 dark:bg-red-700', text: 'text-red-800 dark:text-red-100' },
  { bg: 'bg-blue-200 dark:bg-blue-700', text: 'text-blue-800 dark:text-blue-100' },
  { bg: 'bg-green-200 dark:bg-green-700', text: 'text-green-800 dark:text-green-100' },
  { bg: 'bg-yellow-200 dark:bg-yellow-600', text: 'text-yellow-800 dark:text-yellow-100' },
  { bg: 'bg-purple-200 dark:bg-purple-700', text: 'text-purple-800 dark:text-purple-100' },
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [openIds, setOpenIds] = useState([]);

  useEffect(() => {
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
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
            FAQ
          </h1>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Cari pertanyaan atau jawaban..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {filteredTopics.length > 0 ? (
          filteredTopics.map(topic => (
            <section key={topic.topicId} className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {topic.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
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
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
                    >
                      <div
                        className="flex justify-between items-start cursor-pointer"
                        onClick={() => toggleOpen(item.id)}
                      >
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {item.question}
                        </h3>
                        <span className="ml-4 text-gray-500 dark:text-gray-400">
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
                            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                              {item.answer}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
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
          <p className="text-center text-gray-600 dark:text-gray-400">
            Tidak ada FAQ yang sesuai.
          </p>
        )}
      </div>
    </div>
  );
};

export default FAQ;
