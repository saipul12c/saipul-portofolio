// src/pages/ReleaseNotes.jsx
import React, { useState, useMemo } from 'react';
import { formatDistanceToNow, differenceInMonths } from 'date-fns';
import releaseNotesData from '../../data/releaseNotes.json';

const ITEMS_PER_PAGE = 5;

const ReleaseNotes = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filteredHistory = useMemo(() => {
    const term = search.toLowerCase();
    return releaseNotesData.history
      .filter((entry) => {
        const inVersion = entry.version.toLowerCase().includes(term);
        const inAuthor = entry.author.toLowerCase().includes(term);
        const inNotes = entry.notes.some((note) => note.toLowerCase().includes(term));
        return inVersion || inAuthor || inNotes;
      })
      .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  }, [search]);

  const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE);
  const paginatedHistory = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredHistory.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredHistory, page]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Catatan Rilis
          </h1>

          <div className="flex w-full sm:w-auto items-center gap-3">
            <input
              type="text"
              placeholder="Cari versi, penulis, atau catatan..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-72 px-4 py-2 rounded-xl border border-neutral-300 dark:border-gray-700 bg-neutral-100 dark:bg-gray-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </header>

        <div className="space-y-8">
          {paginatedHistory.length > 0 ? (
            paginatedHistory.map((entry) => {
              const releaseDate = new Date(entry.releaseDate);
              const isRecent = differenceInMonths(new Date(), releaseDate) < 3;

              return (
                <section
                  key={entry.version}
                  className="rounded-2xl border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                        Versi {entry.version}
                      </h2>
                      {isRecent && (
                        <span className="text-sm font-semibold bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
                          Terbaru
                        </span>
                      )}
                    </div>
                    <time
                      dateTime={entry.releaseDate}
                      className="text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      Diperkenalkan {formatDistanceToNow(releaseDate, { addSuffix: true })}
                    </time>
                  </div>

                  <div className="space-y-3 text-base text-neutral-800 dark:text-gray-200 leading-relaxed">
                    {entry.notes.map((note, idx) => (
                      <p key={idx}>{note.replace(/^o\s*/, '')}</p>
                    ))}
                  </div>

                  <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                    Oleh: <span className="font-medium">{entry.author}</span>
                  </p>
                </section>
              );
            })
          ) : (
            <div className="text-center text-neutral-600 dark:text-neutral-400 py-20">
              <p className="text-lg">Tidak ada hasil pencarian ditemukan.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-4 text-sm font-medium text-neutral-700 dark:text-gray-300">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-md bg-neutral-200 dark:bg-gray-700 hover:bg-neutral-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <span>
              Halaman {page} dari {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-md bg-neutral-200 dark:bg-gray-700 hover:bg-neutral-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Berikutnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReleaseNotes;
