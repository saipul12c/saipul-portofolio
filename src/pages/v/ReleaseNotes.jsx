import React, { useState, useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import releaseNotesData from '../../data/releaseNotes.json';

const ITEMS_PER_PAGE = 5;

const ReleaseNotes = () => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState(1);

  const filteredHistory = useMemo(() => {
    const term = search.toLowerCase();
    return releaseNotesData.history.filter((entry) => {
      const inVersion = entry.version.toLowerCase().includes(term);
      const inAuthor = entry.author.toLowerCase().includes(term);
      const inNotes = entry.notes.some((note) => note.toLowerCase().includes(term));
      return inVersion || inAuthor || inNotes;
    });
  }, [search]);

  const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE);
  const paginatedHistory = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredHistory.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredHistory, page]);

  if (!isOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black/80">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          Tampilkan Catatan Rilis
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Catatan Rilis
          </h1>

          <div className="flex w-full sm:w-auto items-center gap-3">
            <input
              type="text"
              placeholder="Cari versi, penulis, atau catatan..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset ke halaman pertama saat pencarian
              }}
              className="w-full sm:w-72 px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 text-sm rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
            >
              Tutup
            </button>
          </div>
        </header>

        <div className="space-y-8">
          {paginatedHistory.length > 0 ? (
            paginatedHistory.map((entry) => {
              const releaseDate = new Date(entry.releaseDate);
              return (
                <section
                  key={entry.version}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-md p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                      Versi {entry.version}
                    </h2>
                    <time
                      dateTime={entry.releaseDate}
                      className="text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      Diperkenalkan {formatDistanceToNow(releaseDate, { addSuffix: true })}
                    </time>
                  </div>

                  <ul className="space-y-2 text-base text-neutral-800 dark:text-neutral-300 leading-relaxed">
                    {entry.notes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>

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
          <div className="mt-10 flex justify-center items-center gap-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <span>
              Halaman {page} dari {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 disabled:opacity-50"
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
