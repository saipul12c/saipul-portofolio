// src/pages/Pengembangan.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { flushSync } from 'react-dom';

export default function Pengembangan({ onFinish, duration = 5000 }) {
  // Hitung detik total berdasarkan duration prop
  const totalSeconds = Math.floor(duration / 1000);

  // State untuk countdown
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  const navigate = useNavigate();
  const location = useLocation();

  // Jika duration berubah, reset secondsLeft
  useEffect(() => {
    setSecondsLeft(totalSeconds);
  }, [totalSeconds]);

  const handleFinishAndRedirect = useCallback(() => {
    // Panggil callback unlockRoutes (di onFinish)
    if (typeof onFinish === 'function') {
      // Gunakan flushSync agar perubahan state di onFinish (unlockRoutes) langsung ter-flush
      flushSync(() => {
        onFinish();
      });
    }

    // Dapatkan target redirect dari query param
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect') || '/';

    // Navigate setelah unlock selesai
    navigate(redirect, { replace: true });
  }, [onFinish, navigate, location.search]);

  useEffect(() => {
    // Countdown: setiap detik kurangi secondsLeft
    const interval = setInterval(() => {
      setSecondsLeft(sec => Math.max(sec - 1, 0));
    }, 1000);

    // Setelah total duration, bersihkan interval dan redirect
    const timeout = setTimeout(() => {
      clearInterval(interval);
      handleFinishAndRedirect();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, handleFinishAndRedirect]);

  // Hitung persentase progress bar
  const progress = totalSeconds > 0
    ? (secondsLeft / totalSeconds) * 100
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-100 to-white p-4">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4">
          🚧 Dalam Pengembangan
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Halaman ini sedang kami kerjakan.<br />
          Akan tersedia dalam{' '}
          <span className="font-semibold text-blue-600">{secondsLeft}</span> detik.
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-blue-500 dark:bg-blue-400 transition-all ease-linear"
            style={{ width: `${progress}%`, transitionDuration: '1s' }}
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleFinishAndRedirect}
            className="mt-2 inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-full transition-colors"
          >
            Lewati &amp; Lihat Halaman
          </button>
        </div>
      </motion.div>
    </div>
  );
}
