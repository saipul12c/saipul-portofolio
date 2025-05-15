import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const certificates = [
  {
    id: 1,
    title: 'React Fundamentals',
    info: 'Menguasai dasar React, hooks, dan state management.',
    tags: ['React', 'Hooks', 'Frontend'],
    images: [
      'https://placehold.co/800x600/EEE/31343C?text=React+1',
      'https://placehold.co/800x600/EEE/31343C?text=React+2',
      'https://placehold.co/800x600/EEE/31343C?text=React+3',
    ],
  },
  {
    id: 2,
    title: 'Node.js Mastery',
    info: 'Server-side JS dan RESTful API.',
    tags: ['Node.js', 'Backend', 'API'],
    images: [
      'https://placehold.co/800x600/EEE/31343C?text=Node+1',
      'https://placehold.co/800x600/EEE/31343C?text=Node+2',
    ],
  },
];

function CertificateCard({ cert, onClick }) {
  return (
    <div
      className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
      onClick={() => onClick(cert)}
    >
      <img
        src={cert.images?.[0]}
        alt={cert.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
        <button className="opacity-0 group-hover:opacity-100 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-full font-semibold transition-opacity">
          Lihat
        </button>
      </div>
    </div>
  );
}

function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-11/12 max-w-2xl p-6 z-10"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl"
              onClick={onClose}
              aria-label="Tutup"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100">
              {cert.title}
            </h2>

            <div className="flex flex-wrap justify-center mb-4">
              {cert.tags.map((tag) => (
                <span
                  key={tag}
                  className="m-1 px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {cert.images.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                className="rounded-lg overflow-hidden mb-4"
              >
                {cert.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`${cert.title} ${idx + 1}`}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="text-center text-sm italic text-gray-500 dark:text-gray-400">
                Tidak ada gambar tersedia.
              </p>
            )}

            <p className="text-center text-gray-600 dark:text-gray-300">{cert.info}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Sertifikat() {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-10 transition-colors">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl font-extrabold mb-12 text-gray-800 dark:text-gray-100">
          Portfolio Sertifikat
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} onClick={setActiveCert} />
          ))}
        </div>

        <CertificateModal cert={activeCert} onClose={() => setActiveCert(null)} />
      </div>
    </div>
  );
}
