// src/pages/Sertifikat.jsx
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Sertifikat = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);

  const certificates = [
    { id: 1, title: 'React Fundamentals', imageUrl: 'https://placehold.co/800x600/EEE/31343C' },
    { id: 2, title: 'Node.js Mastery', imageUrl: 'https://placehold.co/800x600/EEE/31343C' },
    { id: 3, title: 'Advanced JavaScript', imageUrl: 'https://placehold.co/800x600/EEE/31343C' },
    { id: 4, title: 'Full-Stack Development', imageUrl: 'https://placehold.co/800x600/EEE/31343C' },
    { id: 5, title: 'UI/UX Design', imageUrl: 'https://placehold.co/800x600/EEE/31343C' },
  ];

  const openModal = (cert) => {
    setActiveCert(cert);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveCert(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen py-10 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-10">Sertifikat</h1>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {certificates.map((cert) => (
            <SwiperSlide key={cert.id}>
              <div
                className="relative cursor-pointer group p-4"
                onClick={() => openModal(cert)}
              >
                <div className="rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
                    <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold rounded-lg shadow">
                      Lihat
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 text-center">{cert.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {certificates.length === 0 && (
          <div className="text-center text-gray-500 mt-10">Belum ada sertifikat yang tersedia.</div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop blur only */}
          <div
            className="absolute inset-0 backdrop-blur-md bg-transparent"
            onClick={closeModal}
          />

          <div className="relative bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl shadow-2xl p-6 max-w-md w-full z-10 transition-all duration-300">
            <button
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl"
              onClick={closeModal}
              aria-label="Tutup"
            >
              ✕
            </button>
            <img
              src={activeCert.imageUrl}
              alt={activeCert.title}
              className="rounded-lg shadow mb-4 w-full h-auto"
            />
            <h2 className="text-2xl font-bold text-center mb-2">{activeCert.title}</h2>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Ini adalah salah satu sertifikat keahlian yang telah diraih, menunjukkan penguasaan terhadap materi dan penerapan dalam proyek nyata.
              Anda dapat memperluas deskripsi ini sesuai kebutuhan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sertifikat;
