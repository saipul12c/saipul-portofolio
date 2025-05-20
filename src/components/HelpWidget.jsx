// src/components/HelpWidget.jsx
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { formatDistanceToNow } from 'date-fns';
import releaseNotes from '../data/releaseNotes.json';
import aiVersion from '../data/aiVersion.json';
import { initTheme } from '../utils/theme';

const HelpWidget = () => {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [online, setOnline] = useState(true);
  const [joke, setJoke] = useState('');
  const widgetRef = useRef();

  // Inisialisasi tema (siang/malam)
  useEffect(() => { initTheme(); }, []);

  // Cek koneksi port 7000 setiap 30 detik
  useEffect(() => {
    const jokes = [
      'Saipul lagi mimpi indah, coba lagi nanti!',
      'Saipul cuti, ngopi dulu yuk!',
      'Saipul santai di pantai, chat besok ya!',
      'Zzz… Saipul tidur siang!'
    ];
    const check = async () => {
      try {
        const res = await fetch('http://localhost:7000/health');
        if (!res.ok) throw new Error();
        setOnline(true);
      } catch {
        setOnline(false);
        setJoke(jokes[Math.floor(Math.random() * jokes.length)]);
      }
    };
    check();
    const iv = setInterval(check, 30000);
    return () => clearInterval(iv);
  }, []);

  // Tutup saat klik di luar
  useEffect(() => {
    const onClick = e => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setOpen(false);
        setChatOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Ambil entry rilis terbaru dari JSON
  const history = Array.isArray(releaseNotes.history) ? releaseNotes.history : [];
  const latestRelease = history[history.length - 1] || {};
  const releaseVersion = latestRelease.version || '-';
  const releaseDateStr = latestRelease.releaseDate || '';
  const releaseDate = new Date(releaseDateStr);
  const isReleaseDateValid = !isNaN(releaseDate);
  const timeAgo = isReleaseDateValid
    ? formatDistanceToNow(releaseDate, { addSuffix: true })
    : 'Tanggal tidak tersedia';

  // Validasi tanggal AI version tetap sama
  const aiDate = new Date(aiVersion.updatedAt);
  const isAiDateValid = !isNaN(aiDate);
  const aiTimeAgo = isAiDateValid
    ? formatDistanceToNow(aiDate, { addSuffix: true })
    : 'Tanggal tidak tersedia';

  return createPortal(
    <div ref={widgetRef} className="fixed bottom-4 right-4 z-50">
      <div className="relative flex items-end">
        {/* Pop‑up panel di kiri tombol */}
        {open && !chatOpen && (
          <div className="absolute bottom-0 right-10 w-64 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="font-semibold">Catatan Rilis</h3>
            </div>
            {/* Konten */}
            <div className="p-4 space-y-2 text-sm">
              <a href="/release-notes" className="block font-medium hover:underline">Lihat Rilis</a>
              {/* Versi & updated di bawah Lihat Rilis */}
              <div className="pl-2 space-y-1">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Versi: {releaseVersion}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Dirilis: {timeAgo}</p>
              </div>
              <a href="/faq" className="block hover:underline">FAQ</a>
              <a href="/komitmen" className="block hover:underline">Komitmen</a>
              <a href="/ai-version" className="block hover:underline">Versi AI ({aiVersion.version})</a>
            </div>
            {/* Tombol Chat */}
            <div className="px-4 pb-4">
              <button
                onClick={() => setChatOpen(true)}
                className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Mulai Chat
              </button>
            </div>
          </div>
        )}

        {/* Live Chat panel */}
        {open && chatOpen && (
          <div className="absolute bottom-0 right-10 w-72 h-80 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="font-semibold">Live Chat</h3>
              <button onClick={() => setChatOpen(false)} className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">✕</button>
            </div>
            <div className="flex-grow px-4 py-3 overflow-y-auto text-sm">
              {online
                ? <p className="text-neutral-600 dark:text-neutral-400">Menghubungkan ke <code>localhost:7000</code>…</p>
                : <p className="text-neutral-600 dark:text-neutral-400">{joke}</p>
              }
            </div>
            <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Model AI bisa salah. Cek ulang info penting.
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Versi AI: {aiVersion.version} (upd. {aiTimeAgo})
              </p>
              <input
                type="text"
                placeholder="Tulis pesan..."
                disabled={!online}
                className="w-full border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
              />
            </div>
          </div>
        )}

        {/* Tombol "?" kecil */}
        <button
          onClick={() => setOpen(o => !o)}
          className="w-8 h-8 bg-neutral-700 dark:bg-neutral-300 text-white dark:text-black rounded-full shadow hover:shadow-lg flex items-center justify-center transition"
          aria-label="Bantuan"
        >
          ?
        </button>
      </div>
    </div>,
    document.body
  );
};

export default HelpWidget;
