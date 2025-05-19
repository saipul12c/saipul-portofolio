// src/components/AiVersion.jsx
import React, { useState } from 'react';
import aiVersionData from '../../data/aiVersion.json';
import { FiHelpCircle, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiVersion() {
  const [open, setOpen] = useState(false);
  const {
    version,
    updatedAt,
    releaseDate,
    author,
    notes,
    compatibility,
    knownIssues
  } = aiVersionData;

  const formatDate = iso =>
    new Date(iso).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  return (
    <>
      {/* Tombol “?” */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-full shadow-md hover:shadow-lg transition"
        aria-label="Buka Informasi Versi"
      >
        <FiHelpCircle className="w-5 h-5" />
      </button>

      {/* Popup ala menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-20 right-6 z-50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="bg-white dark:bg-gray-900 w-[350px] md:w-[420px] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-y-auto max-h-[75vh]">
              {/* Header panel dengan tombol tutup */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Saipul AI v{version}
                </h4>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  aria-label="Tutup"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Konten asli tetap, dibungkus supaya tetap tampil rapi dalam panel */}
              <div className="px-4 py-4 space-y-6 text-sm text-gray-800 dark:text-gray-200">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 text-white rounded-xl p-4 shadow">
                  <h2 className="text-xl font-bold mb-1">Saipul AI</h2>
                  <p><strong>Versi:</strong> {version} — diperbarui {formatDate(updatedAt)}</p>
                </div>

                <section>
                  <h3 className="font-semibold mb-1">Release Metadata</h3>
                  <ul className="space-y-1">
                    <li><strong>Release Date:</strong> {formatDate(releaseDate)}</li>
                    <li><strong>Author:</strong> {author}</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold mb-1">Compatibility</h3>
                  <ul className="space-y-1">
                    <li><strong>Min Client:</strong> {compatibility.minClientVersion}</li>
                    <li>
                      <strong>Tested on:</strong>
                      <ul className="list-disc list-inside ml-4">
                        {compatibility.testedOn.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold mb-1">Known Issues</h3>
                  <ul className="list-disc list-inside ml-4">
                    {knownIssues.map((issue, i) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold mb-2 text-center">Release Notes</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { title: 'New Features', items: notes.newFeatures },
                      { title: 'Improvements', items: notes.improvements },
                      { title: 'Bug Fixes', items: notes.bugFixes }
                    ].map((group, idx) => (
                      <div key={idx}>
                        <h4 className="font-medium">{group.title}</h4>
                        <ul className="list-disc list-inside ml-4">
                          {group.items.map((text, i) => (
                            <li key={i}>{text}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
