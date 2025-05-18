import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import releaseNotesData from '../../data/releaseNotes.json';
import { initTheme, toggleTheme } from '../../utils/theme';

const ReleaseNotes = () => {
  const [search, setSearch] = useState('');

  // Initialize theme on load
  useEffect(() => {
    initTheme();
  }, []);

  // Filter release notes based on search query
  const filteredHistory = releaseNotesData.history.filter((entry) => {
    const term = search.toLowerCase();
    const inVersion = entry.version.toLowerCase().includes(term);
    const inAuthor = entry.author.toLowerCase().includes(term);
    const inNotes = entry.notes.some((note) => note.toLowerCase().includes(term));
    return inVersion || inAuthor || inNotes;
  });

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-0">
          Catatan Rilis
        </h1>
        <div className="flex items-center space-x-3">
          {/* Search input */}
          <input
            type="text"
            placeholder="Cari versi, penulis, atau catatan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* Simple icon text, could replace with actual icon */}
            🌙/☀️
          </button>
        </div>
      </header>

      <div className="space-y-6">
        {filteredHistory.length ? (
          filteredHistory.map((entry) => {
            const releaseDate = new Date(entry.releaseDate);
            return (
              <section
                key={entry.version}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-5 border border-neutral-200 dark:border-neutral-700"
              >
                <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                  <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-100">
                    Versi {entry.version}
                  </h2>
                  <time
                    dateTime={entry.releaseDate}
                    className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 sm:mt-0"
                  >
                    Diperkenalkan {formatDistanceToNow(releaseDate, { addSuffix: true })}
                  </time>
                </header>

                <ul className="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
                  {entry.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>

                <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                  Oleh: {entry.author}
                </p>
              </section>
            );
          })
        ) : (
          <p className="text-neutral-600 dark:text-neutral-400">Tidak ada hasil pencarian.</p>
        )}
      </div>
    </div>
  );
};

export default ReleaseNotes;
