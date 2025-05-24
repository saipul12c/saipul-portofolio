import React from 'react';
import aiVersionData from '../../data/aiVersion.json';
import { FiCheckCircle } from 'react-icons/fi';

export default function AiVersion() {
  const {
    version,
    updatedAt,
    releaseDate,
    author,
    notes,
    compatibility,
    knownIssues
  } = aiVersionData;

  const formatDate = (iso) =>
    new Date(iso).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const renderNoteGroup = (title, items) => (
    <div>
      <h4 className="font-medium text-lg mb-2">{title}</h4>
      <ul className="space-y-2">
        {items.map((text, index) => (
          <li key={index} className="flex items-start gap-2">
            <FiCheckCircle className="mt-1 text-blue-500 dark:text-blue-400 flex-shrink-0" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Saipul AI – Versi {version}
        </h1>

        <div className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 text-white rounded-xl p-6 shadow mb-8">
          <h2 className="text-2xl font-bold mb-1">Informasi Versi</h2>
          <p><strong>Versi:</strong> {version}</p>
          <p><strong>Diperbarui:</strong> {formatDate(updatedAt)}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-6 text-gray-800 dark:text-gray-200">
          <section>
            <h3 className="text-xl font-semibold mb-2">Release Metadata</h3>
            <ul className="space-y-1">
              <li><strong>Release Date:</strong> {formatDate(releaseDate)}</li>
              <li><strong>Author:</strong> {author}</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Compatibility</h3>
            <ul className="space-y-1">
              <li><strong>Min Client:</strong> {compatibility.minClientVersion}</li>
              <li>
                <strong>Tested on:</strong>
                <ul className="list-disc list-inside ml-4">
                  {compatibility.testedOn.map((browser, index) => (
                    <li key={index}>{browser}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Known Issues</h3>
            <ul className="list-disc list-inside ml-4">
              {knownIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4 text-center">Release Notes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderNoteGroup('New Features', notes.newFeatures)}
              {renderNoteGroup('Improvements', notes.improvements)}
              {renderNoteGroup('Bug Fixes', notes.bugFixes)}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
