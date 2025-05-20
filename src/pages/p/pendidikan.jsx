// src/pages/p/pendidikan.jsx
import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, X, ChevronLeft, ChevronRight } from 'lucide-react';

const data = [
  {
    id: 1,
    institution: 'Universitas ABC',
    degree: 'Sarjana Teknik Informatika',
    period: '2015 - 2019',
    description: 'Memperdalam ilmu algoritma, struktur data, dan pengembangan web.',
    media: [
      { type: 'image', src: '/images/uni-abc-1.jpg' },
      // ... lebih dari 10 media
    ],
  },
  // ... lainnya
];

function Modal({ item, onClose }) {
  const [current, setCurrent] = useState(0);
  const len = item.media.length;

  const prev = useCallback((e) => {
    e.stopPropagation();
    setCurrent(idx => (idx - 1 + len) % len);
  }, [len]);

  const next = useCallback((e) => {
    e.stopPropagation();
    setCurrent(idx => (idx + 1) % len);
  }, [len]);

  const goTo = useCallback((e, idx) => {
    e.stopPropagation();
    setCurrent(idx);
  }, []);

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-lg"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden mx-4 sm:mx-0 flex flex-col sm:flex-row"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Left: Media Carousel */}
            <div className="relative flex-shrink-0 w-full sm:w-1/2 h-64 sm:h-auto bg-black">
              {item.media[current].type === 'image' ? (
                <img
                  src={item.media[current].src}
                  alt="media"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={item.media[current].src}
                  controls
                  className="w-full h-full object-cover"
                />
              )}

              <button
                onClick={prev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
              >
                <ChevronRight />
              </button>

              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {item.media.map((m, idx) => (
                  <div
                    key={idx}
                    className={`w-12 h-8 sm:w-16 sm:h-10 cursor-pointer border-2 ${
                      idx === current ? 'border-indigo-500' : 'border-transparent'
                    }`}
                    onClick={(e) => goTo(e, idx)}
                  >
                    {m.type === 'image' ? (
                      <img
                        src={m.src}
                        alt={`thumb-${idx}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={m.src}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div className="p-6 overflow-auto flex-1 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10"
              >
                <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              </button>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {item.institution}
              </h3>
              <span className="text-indigo-600 font-medium mb-4 block">
                {item.period}
              </span>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {item.degree}
              </h4>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function Pendidikan() {
  const [selected, setSelected] = useState(null);

  const handleOpen = useCallback((item) => () => {
    setSelected(item);
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-12"
        >
          Riwayat Pendidikan
        </motion.h2>

        <div className="absolute left-1/2 transform -translate-x-1 w-1 h-full bg-gradient-to-b from-blue-300 to-purple-300" />

        <div className="space-y-12">
          {data.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3, duration: 0.6 }}
                className={`relative flex flex-col sm:flex-row ${
                  isLeft ? 'sm:justify-start' : 'sm:justify-end'
                }`}
              >
                <div
                  className="w-full sm:w-2/3 cursor-pointer transform hover:scale-105 transition-transform"
                  onClick={handleOpen(item)}
                >
                  <div className="relative z-10 bg-white bg-opacity-60 dark:bg-gray-800 dark:bg-opacity-60 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center mb-2">
                      <GraduationCap className="w-6 h-6 text-indigo-600 mr-2" />
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        {item.institution}
                      </h3>
                    </div>
                    <span className="text-indigo-600 font-medium">
                      {item.period}
                    </span>
                    <h4 className="mt-2 font-semibold text-gray-700 dark:text-gray-200">
                      {item.degree}
                    </h4>
                    <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 top-4 transform -translate-x-1/2 bg-white border-4 border-indigo-400 rounded-full w-6 h-6" />
              </motion.div>
            );
          })}
        </div>

        {selected && <Modal item={selected} onClose={handleClose} />}
      </div>
    </section>
  );
}
