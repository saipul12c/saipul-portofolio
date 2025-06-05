// src/components/HelpWidget.jsx
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { formatDistanceToNow } from 'date-fns';
import releaseNotes from '../data/releaseNotes.json';
import aiVersionList from '../data/aiVersion.json'; // update: pakai list
import { initTheme } from '../utils/theme';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaTimes } from 'react-icons/fa';

const HelpWidget = () => {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [online, setOnline] = useState(true);
  const [joke, setJoke] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const widgetRef = useRef();

  useEffect(() => { initTheme(); }, []);

  useEffect(() => {
    const jokes = [
      'Saipul lagi mimpi indah, coba lagi nanti!',
      'Saipul cuti, ngopi dulu yuk!',
      'Saipul santai di pantai, chat besok ya!',
      'Zzz… Saipul tidur siang!'
    ];
    const check = async () => {
      try {
        const res = await fetch('http://localhost:7000/health', { cache: 'no-store' });
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

  const history = Array.isArray(releaseNotes.history) ? releaseNotes.history : [];
  const latestRelease = history[history.length - 1] || {};
  const releaseVersion = latestRelease.version || '-';
  const releaseDateStr = latestRelease.releaseDate || '';
  const releaseDate = new Date(releaseDateStr);
  const isReleaseDateValid = !isNaN(releaseDate);
  const timeAgo = isReleaseDateValid
    ? formatDistanceToNow(releaseDate, { addSuffix: true })
    : 'Tanggal tidak tersedia';

  // Ambil versi AI terbaru dari array
  const latestAiVersion = Array.isArray(aiVersionList) ? aiVersionList[0] : { version: '-', updatedAt: '' };
  const aiDate = new Date(latestAiVersion.updatedAt);
  const isAiDateValid = !isNaN(aiDate);
  const aiTimeAgo = isAiDateValid
    ? formatDistanceToNow(aiDate, { addSuffix: true })
    : 'Tanggal tidak tersedia';

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('http://localhost:7000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
        cache: 'no-store'
      });
      const data = await res.json();
      const aiReply = { role: 'ai', text: data.reply };
      setMessages(prev => [...prev, aiReply]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: '❌ Gagal menghubungi Saipul AI.' }]);
    }
  };

  return createPortal(
    <div ref={widgetRef} className="fixed bottom-5 right-4 z-50">
      <motion.button
        className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-600 transition duration-300"
        onClick={() => {
          setOpen(o => !o);
          if (chatOpen) setChatOpen(false);
        }}
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaQuestionCircle />
      </motion.button>

      {open && !chatOpen && (
        <motion.div
          className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Butuh Bantuan?</h4>
            <button
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2 mb-3">
            <li>
              <a href="/release-notes" className="hover:underline hover:text-blue-500 dark:hover:text-blue-300">
                Catatan Rilis
              </a>
              <p className="text-xs text-gray-500 mt-1">Versi: {releaseVersion}</p>
              <p className="text-xs text-gray-500">{timeAgo}</p>
            </li>
            <li>
              <a href="/faq" className="hover:underline hover:text-blue-500 dark:hover:text-blue-300">
                FAQ
              </a>
            </li>
            <li>
              <a href="/komitmen" className="hover:underline hover:text-blue-500 dark:hover:text-blue-300">
                Komitmen
              </a>
            </li>
            <li>
              <a href="/ai-version" className="hover:underline hover:text-blue-500 dark:hover:text-blue-300">
                Versi AI ({latestAiVersion.version})
              </a>
            </li>
          </ul>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm shadow-md hover:bg-blue-600 transition duration-300"
            onClick={() => {
              setChatOpen(true);
              setOpen(false);
            }}
          >
            Live Saipul AI
          </button>
        </motion.div>
      )}

      {chatOpen && (
        <motion.div
          className="absolute bottom-16 right-0 w-80 h-96 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Live Chat</h4>
            <button
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setChatOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto text-sm text-gray-700 dark:text-gray-300 mb-2 space-y-2 pr-1">
            {online ? (
              messages.length === 0 ? (
                <p className="text-gray-400 italic">Ketik pesan untuk mulai percakapan...</p>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`px-3 py-1 rounded-lg max-w-xs ${
                      msg.role === 'user'
                        ? 'bg-blue-100 dark:bg-blue-800 self-end text-right'
                        : 'bg-gray-200 dark:bg-gray-700 self-start'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              )
            ) : (
              <p>{joke}</p>
            )}
          </div>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Tulis pesan..."
              disabled={!online}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Model AI bisa salah. Cek ulang info penting.
            <br />
            Versi AI: {latestAiVersion.version} (upd. {aiTimeAgo})
          </div>
        </motion.div>
      )}
    </div>,
    document.body
  );
};

export default HelpWidget;
