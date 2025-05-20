// src/pages/KontakAdmin.jsx
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const KontakAdmin = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitData, setSubmitData] = useState(null);

  // Ambil data dari localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('kontakForm'));
    if (saved) setFormData(saved);
  }, []);

  // Auto-save form jika pengaturan aktif
  useEffect(() => {
    if (autoSave) localStorage.setItem('kontakForm', JSON.stringify(formData));
  }, [formData, autoSave]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setAutoSave(true);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) return toast.error('Alamat email tidak valid');
    if (formData.name.trim().length < 3) return toast.error('Nama minimal 3 karakter');
    if (formData.message.trim().length < 10) return toast.error('Pesan minimal 10 karakter');
    setSubmitData(formData);
    setShowModal(true);
  };

  const saveToSpreadsheet = (data) => {
    fetch('https://sheetdb.io/api/v1/f82fubszb4yi4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([data]),
    })
      .then(() => toast.success('Data tersimpan dan admin akan segera menghubungi Anda'))
      .catch(() => toast.error('Gagal menyimpan data. Coba lagi nanti.'));
  };

  const sendEmail = () => {
    setLoading(true);
    emailjs
      .sendForm('service_3kbyywo', 'template_fj5vcy2', document.querySelector('form'), 'aTAX2vixR2OHmzvIl')
      .then(() => {
        setLoading(false);
        toast.success(
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            <span>Pesan berhasil dikirim!</span>
          </div>
        );
        saveToSpreadsheet(submitData);
        setFormData({ name: '', email: '', message: '' });
        localStorage.removeItem('kontakForm');
        setShowModal(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error(
          <div className="flex items-center">
            <FaExclamationCircle className="text-red-500 mr-2" />
            <span>Pengiriman gagal, silakan coba lagi</span>
          </div>
        );
      });
  };

  return (
    <motion.section
      id="contact"
      className="bg-gradient-to-b from-white to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header Branding */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-indigo-700 dark:text-indigo-300">
            Hubungi Muhammad Syaiful Mukmin
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Jangan ragu berbicara—saya siap membantu Anda mewujudkan proyek digital dengan solusi profesional dan tepat sasaran.
          </p>
        </div>

        {/* Form (tanpa skeleton) */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <label className="block mb-4">
            <span className="text-gray-700 dark:text-gray-300 font-semibold">Nama Lengkap</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama Anda"
              className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 dark:text-gray-300 font-semibold">Alamat Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@domain.com"
              className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700 dark:text-gray-300 font-semibold">Pesan Anda</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tulis pesan atau pertanyaan Anda di sini..."
              rows="5"
              className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg shadow-md transition ${
              loading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Mengirim...' : 'Kirim Pesan'}
          </button>
        </motion.form>

        <ToastContainer position="bottom-right" />

        {/* Modal Konfirmasi */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl max-w-sm w-full"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  Konfirmasi Data
                </h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2">
                  <p><strong>Nama:</strong> {submitData?.name}</p>
                  <p><strong>Email:</strong> {submitData?.email}</p>
                  <p><strong>Pesan:</strong> {submitData?.message}</p>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                  >
                    Batal
                  </button>
                  <button
                    onClick={sendEmail}
                    disabled={loading}
                    className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition ${
                      loading
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    Kirim Sekarang
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default KontakAdmin;
