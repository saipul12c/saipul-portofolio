// src/pages/Skills.jsx
import React, { useState, useMemo } from 'react';
import {
  FiCode,
  FiLayout,
  FiDatabase,
  FiSmartphone,
  FiCloud,
  FiServer,
  FiBookOpen,
  FiGithub,
  FiBook,
  FiUserCheck,
  FiX,
} from 'react-icons/fi';

// Data lengkap skill
const skills = [
  // Frontend
  { name: 'HTML & CSS', icon: <FiLayout />, level: 90, date: '2024-05-05', desc: 'Markup semantik & styling responsif.' },
  { name: 'JavaScript', icon: <FiCode />, level: 85, date: '2024-05-01', desc: 'Interaktivitas halaman & logic front-end.' },
  { name: 'React', icon: <FiSmartphone />, level: 80, date: '2024-04-28', desc: 'SPA dengan hooks, context, dan optimisasi.' },
  { name: 'Vue.js', icon: <FiSmartphone />, level: 70, date: '2024-03-20', desc: 'Framework progresif untuk UI reaktif.' },
  { name: 'Angular', icon: <FiSmartphone />, level: 65, date: '2024-02-15', desc: 'Platform aplikasi web terstruktur lengkap.' },
  // Backend
  { name: 'Node.js', icon: <FiServer />, level: 75, date: '2024-04-20', desc: 'Server-side JS: API, realtime, microservices.' },
  { name: 'Express', icon: <FiServer />, level: 70, date: '2024-03-30', desc: 'Framework minimalis untuk REST API.' },
  { name: 'Django', icon: <FiServer />, level: 60, date: '2024-01-10', desc: 'Web framework Python full-stack.' },
  { name: 'Flask', icon: <FiServer />, level: 55, date: '2023-12-05', desc: 'Microframework Python untuk layanan ringan.' },
  // Database
  { name: 'PostgreSQL', icon: <FiDatabase />, level: 70, date: '2024-04-15', desc: 'Database relasional & query kompleks.' },
  { name: 'MongoDB', icon: <FiDatabase />, level: 65, date: '2024-04-10', desc: 'Database dokumen NoSQL fleksibel.' },
  // DevOps & Cloud
  { name: 'AWS', icon: <FiCloud />, level: 60, date: '2023-11-20', desc: 'Layanan cloud: EC2, S3, Lambda, RDS.' },
  { name: 'Docker', icon: <FiCloud />, level: 65, date: '2024-03-05', desc: 'Containerization & deployment ringan.' },
  // Teaching
  { name: 'Mengajar', icon: <FiUserCheck />, level: 95, date: '2024-01-01', desc: 'Mampu mengajar semua jenjang usia dan materi.' },
];

function getRelativeTime(dateString) {
  const rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' });
  const now = new Date();
  const date = new Date(dateString);
  const diffDays = Math.floor((date - now) / (1000 * 60 * 60 * 24));
  if (Math.abs(diffDays) < 7) return rtf.format(diffDays, 'day');
  const diffWeeks = Math.round(diffDays / 7);
  if (Math.abs(diffWeeks) < 5) return rtf.format(diffWeeks, 'week');
  const diffMonths = Math.round(diffDays / 30);
  if (Math.abs(diffMonths) < 12) return rtf.format(diffMonths, 'month');
  return rtf.format(Math.round(diffDays / 365), 'year');
}

export default function Skills() {
  const [selected, setSelected] = useState(null);

  const enriched = useMemo(
    () => skills.map(s => {
      const rel = getRelativeTime(s.date);
      const years = (new Date() - new Date(s.date)) / (1000 * 60 * 60 * 24 * 365);
      return { ...s, relative: rel, isNew: years < 1 };
    }),
    []
  );

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Keahlian Kami</h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl">Klik skill untuk detail. Label <span className="px-2 py-1 bg-red-100 text-red-600 rounded">Baru</span> berarti pengalaman &lt;1 tahun.</p>
      </section>

      {/* Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {enriched.map(skill => (
            <button
              key={skill.name}
              onClick={() => setSelected(skill)}
              className="relative p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 focus:outline-none"
            >
              {skill.isNew && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">Baru</span>
              )}
              <div className="flex justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">{skill.name}</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-indigo-600 dark:bg-indigo-400 transition-width duration-500" style={{ width: `${skill.level}%` }} />
              </div>
              <span className="absolute top-4 right-4 text-sm font-medium">{skill.level}%</span>
            </button>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Close"
            >
              <FiX className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-indigo-600 dark:text-indigo-400">
                {selected.icon}
              </div>
              <h2 className="text-2xl font-bold">{selected.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{selected.desc}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Diperbarui {selected.relative}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Tanggal: {selected.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
