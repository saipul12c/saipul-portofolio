// pages/KontakAdmin.jsx
import React, { useState } from 'react';

const KontakAdmin = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulasi pengiriman data
    try {
      // Ganti ini dengan logika pengiriman data Anda (misalnya, fetch atau axios)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulasi delay 2 detik
      // Jika berhasil:
      setIsSubmitted(true);
      setFormData({ nama: '', email: '', pesan: '' }); // Reset form
      setSubmissionError(null); // Clear any previous error
    } catch (error) {
      // Jika terjadi kesalahan:
      setIsSubmitted(false);
      setSubmissionError('Terjadi kesalahan. Silakan coba lagi nanti.');
      console.error("Error submitting form:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Pesan Terkirim!</h1>
        <p className="text-lg text-gray-700">
          Terima kasih atas pesan Anda.  Saya akan segera menghubungi Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Hubungi Admin</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="nama" className="block text-gray-700 text-sm font-bold mb-2">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="pesan" className="block text-gray-700 text-sm font-bold mb-2">
            Pesan
          </label>
          <textarea
            id="pesan"
            name="pesan"
            value={formData.pesan}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-y"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isSubmitted}
        >
          {isSubmitted ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
        {submissionError && (
          <p className="text-red-500 text-xs italic mt-4">
            {submissionError}
          </p>
        )}
      </form>
    </div>
  );
};

export default KontakAdmin;
