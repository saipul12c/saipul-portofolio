import React from 'react';
import { Link } from 'react-router-dom';
import { FaBug } from 'react-icons/fa';

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="text-center max-w-md w-full">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 dark:bg-yellow-200 rounded-full mb-6 animate-bounce">
          <FaBug className="w-10 h-10 text-yellow-600 dark:text-yellow-700" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-800 dark:text-gray-100 mb-4">
          Ups! Ada yang nggak beres 🐞
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6">
          Sepertinya kita tersesat di labirin kode. Halaman yang kamu cari tidak ditemukan.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-sm sm:text-base font-medium rounded-lg bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 text-white transition"
        >
          Bantu si Bug pulang
        </Link>
      </div>
    </div>
  );
}
