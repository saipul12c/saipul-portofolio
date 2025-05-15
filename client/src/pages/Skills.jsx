// src/pages/Skills.jsx
import React, { useState, useMemo, useEffect } from 'react';
import {
  FiCode,
  FiLayout,
  FiDatabase,
  FiSmartphone,
  FiCloud,
  FiServer,
  FiUserCheck,
  FiX,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const skills = [
  { name: 'HTML & CSS', icon: <FiLayout />, level: 90, date: '2024-05-05', desc: 'Markup semantik & styling responsif.', tags: ['Frontend', 'Web'] },
  { name: 'JavaScript', icon: <FiCode />, level: 85, date: '2024-05-01', desc: 'Interaktivitas halaman & logic front-end.', tags: ['Frontend', 'Language'] },
  { name: 'React', icon: <FiSmartphone />, level: 80, date: '2024-04-28', desc: 'SPA dengan hooks, context, dan optimisasi.', tags: ['Frontend', 'Library'] },
  { name: 'Vue.js', icon: <FiSmartphone />, level: 70, date: '2024-03-20', desc: 'Framework progresif untuk UI reaktif.', tags: ['Frontend', 'Framework'] },
  { name: 'Angular', icon: <FiSmartphone />, level: 65, date: '2024-02-15', desc: 'Platform aplikasi web terstruktur lengkap.', tags: ['Frontend', 'Framework'] },
  { name: 'Node.js', icon: <FiServer />, level: 75, date: '2024-04-20', desc: 'Server-side JS: API, realtime, microservices.', tags: ['Backend', 'Runtime'] },
  { name: 'Express', icon: <FiServer />, level: 70, date: '2024-03-30', desc: 'Framework minimalis untuk REST API.', tags: ['Backend', 'Framework'] },
  { name: 'Django', icon: <FiServer />, level: 60, date: '2024-01-10', desc: 'Web framework Python full-stack.', tags: ['Backend', 'Python'] },
  { name: 'Flask', icon: <FiServer />, level: 55, date: '2023-12-05', desc: 'Microframework Python untuk layanan ringan.', tags: ['Backend', 'Python'] },
  { name: 'PostgreSQL', icon: <FiDatabase />, level: 70, date: '2024-04-15', desc: 'Database relasional & query kompleks.', tags: ['Database', 'SQL'] },
  { name: 'MongoDB', icon: <FiDatabase />, level: 65, date: '2024-04-10', desc: 'Database dokumen NoSQL fleksibel.', tags: ['Database', 'NoSQL'] },
  { name: 'AWS', icon: <FiCloud />, level: 60, date: '2023-11-20', desc: 'Layanan cloud: EC2, S3, Lambda, RDS.', tags: ['Cloud', 'DevOps'] },
  { name: 'Docker', icon: <FiCloud />, level: 65, date: '2024-03-05', desc: 'Containerization & deployment ringan.', tags: ['DevOps', 'Container'] },
  { name: 'Mengajar', icon: <FiUserCheck />, level: 95, date: '2024-01-01', desc: 'Mampu mengajar semua jenjang usia dan materi.', tags: ['Soft Skill', 'Teaching'] },
];

function getRelativeTime(dateString) {
  const rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' });
  const now = new Date();
  const date = new Date(dateString);
  const diff = date - now;
  const days = Math.round(diff / (1000 * 60 * 60 * 24));
  if (Math.abs(days) < 7) return rtf.format(days, 'day');
  const weeks = Math.round(days / 7);
  if (Math.abs(weeks) < 5) return rtf.format(weeks, 'week');
  const months = Math.round(days / 30);
  if (Math.abs(months) < 12) return rtf.format(months, 'month');
  const years = Math.round(days / 365);
  return rtf.format(years, 'year');
}

function SkillCard({ skill, onClick }) {
  return (
    <button
      onClick={() => onClick(skill)}
      className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex justify-center mb-4 text-indigo-600 dark:text-indigo-400 text-3xl">
        {skill.icon}
      </div>
      <h3 className="text-lg font-semibold text-center">{skill.name}</h3>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3 mb-2">
        <div
          className="h-full bg-indigo-600 dark:bg-indigo-400"
          style={{ width: `${skill.level}%` }}
        />
      </div>
      <span className="absolute top-4 right-4 text-sm text-gray-500 dark:text-gray-400 font-medium">{skill.level}%</span>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {skill.tags.map(tag => (
          <span
            key={tag}
            className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-100 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

function SkillModal({ skill, onClose }) {
  useEffect(() => {
    const esc = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  if (!skill) return null;
  const relative = getRelativeTime(skill.date);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-md w-full relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Tutup"
          >
            <FiX className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="text-4xl text-indigo-600 dark:text-indigo-400">{skill.icon}</div>
            <h2 className="text-2xl font-bold">{skill.name}</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {skill.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-100 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{skill.desc}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Diperbarui {relative}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(skill.date).toLocaleDateString('id')}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Skills() {
  const [selected, setSelected] = useState(null);

  const enriched = useMemo(
    () =>
      skills.map(skill => ({
        ...skill,
        isNew: (Date.now() - new Date(skill.date)) / (1000 * 60 * 60 * 24 * 365) < 1,
      })),
    []
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen transition-colors duration-300">
      <section className="py-16 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Keahlian Kami</h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Telusuri keahlian kami di berbagai bidang teknologi dan pengembangan perangkat lunak. 
            
          </p>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {enriched.map(skill => (
            <SkillCard key={skill.name} skill={skill} onClick={setSelected} />
          ))}
        </div>
      </section>

      <SkillModal skill={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
