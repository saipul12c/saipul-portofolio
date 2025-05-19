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
  {
    name: 'HTML & CSS',
    icon: <FiLayout />,
    level: 90,
    desc:
      'Dengan HTML & CSS, saya merajut kerangka dan gaya layaknya barista menyajikan latte art: detail rapi, responsif di segala ukuran layar, dan selalu menarik perhatian.',
    tags: ['Markup', 'Styling'],
  },
  {
    name: 'JavaScript',
    icon: <FiCode />,
    level: 85,
    desc:
      'JavaScript bagi saya seperti kopi pagi—menghidupkan halaman web dengan interaktivitas dinamis, logika cerdas, dan pengalaman pengguna yang menggugah.',
    tags: ['Interaktivitas', 'Logika'],
  },
  {
    name: 'React',
    icon: <FiSmartphone />,
    level: 80,
    desc:
      'React adalah andalan saya untuk membangun SPA cepat dan modular; setiap komponen diracik seefisien resep kopi terbaik, mudah dipadupadankan.',
    tags: ['Komponen', 'Hooks'],
  },
  {
    name: 'Vue.js',
    icon: <FiSmartphone />,
    level: 70,
    desc:
      'Vue.js saya gunakan ketika butuh framework progresif yang ringan—seperti espresso, kental tetapi tak membuat browser tersendat.',
    tags: ['Reaktivitas', 'Sederhana'],
  },
  {
    name: 'Angular',
    icon: <FiSmartphone />,
    level: 65,
    desc:
      'Angular saya pilih untuk aplikasi besar: struktur rapi seperti menu kopi lengkap, semua dependensi terkelola dalam satu paket terpadu.',
    tags: ['Terstruktur', 'Enterprise'],
  },
  {
    name: 'Node.js',
    icon: <FiServer />,
    level: 75,
    desc:
      'Node.js di tangan saya menjadi dapur backend yang gesit—API, realtime, microservices, semuanya saya hidangkan segar tanpa antrian panjang.',
    tags: ['Server', 'Realtime'],
  },
  {
    name: 'Express',
    icon: <FiServer />,
    level: 70,
    desc:
      'Express saya kembangkan layaknya menu signature: minimalis tapi kaya rasa—REST API cepat dan mudah dikembangkan.',
    tags: ['Minimalis', 'REST API'],
  },
  {
    name: 'Django',
    icon: <FiServer />,
    level: 60,
    desc:
      'Django adalah pilihan saya saat butuh framework Python full-stack yang “berat” tapi teruji—mirip kopi tubruk, pahitnya bikin nagih.',
    tags: ['Full-Stack', 'Python'],
  },
  {
    name: 'Flask',
    icon: <FiServer />,
    level: 55,
    desc:
      'Flask saya gunakan untuk layanan ringan—microframework yang gesit, cepat diseduh, dan cocok untuk prototipe maupun layanan kecil.',
    tags: ['Micro', 'Python'],
  },
  {
    name: 'PostgreSQL',
    icon: <FiDatabase />,
    level: 70,
    desc:
      'PostgreSQL saya andalkan untuk data relasional: query kompleks dan konsistensi data terjaga, seperti racikan kopi yang selalu sama nikmatnya.',
    tags: ['Relasional', 'Analitik'],
  },
  {
    name: 'MongoDB',
    icon: <FiDatabase />,
    level: 65,
    desc:
      'MongoDB saya pilih saat butuh skema fleksibel—dokumen NoSQL yang gampang berkembang, cocok untuk ide project yang sering berubah.',
    tags: ['NoSQL', 'Skalabilitas'],
  },
  {
    name: 'AWS',
    icon: <FiCloud />,
    level: 60,
    desc:
      'AWS adalah “warung kopi” cloud saya: EC2, S3, Lambda, RDS—semua layanan tersedia untuk menghidupkan aplikasi skala apa pun.',
    tags: ['Cloud', 'DevOps'],
  },
  {
    name: 'Docker',
    icon: <FiCloud />,
    level: 65,
    desc:
      'Docker bagi saya seperti cangkir portabel: container ringan yang memudahkan deployment di mana saja tanpa takut tumpah konfigurasi.',
    tags: ['Container', 'Deployment'],
  },
  {
    name: 'Mengajar',
    icon: <FiUserCheck />,
    level: 95,
    desc:
      'Mengajar adalah passion utama—saya menyederhanakan konsep sulit layaknya bercerita ringan sambil menyeruput kopi, hingga semua murid paham.',
    tags: ['Soft Skill', 'Teaching'],
  },
];

function SkillCard({ skill, onClick }) {
  const tagStyles = [
    'bg-red-100 text-red-700',
    'bg-green-100 text-green-700',
    'bg-blue-100 text-blue-700',
    'bg-yellow-100 text-yellow-700',
  ];
  return (
    <button
      onClick={() => onClick(skill)}
      className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex justify-center mb-4 text-indigo-600 dark:text-indigo-400 text-3xl">
        {skill.icon}
      </div>
      <h3 className="text-lg font-semibold text-center mb-2">{skill.name}</h3>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3 mb-2">
        <div
          className="h-full bg-indigo-600 dark:bg-indigo-400"
          style={{ width: `${skill.level}%` }}
        />
      </div>
      <span className="absolute top-4 right-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
        {skill.level}%
      </span>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {skill.tags.map((tag, i) => (
          <span
            key={tag}
            className={`text-xs px-2 py-1 rounded-full ${tagStyles[i % tagStyles.length]}`}
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
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  if (!skill) return null;

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
          onClick={(e) => e.stopPropagation()}
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
              {skill.tags.map((tag, i) => (
                <span
                  key={tag}
                  className={`text-xs px-2 py-1 rounded-full ${[
                    'bg-red-100 text-red-700',
                    'bg-green-100 text-green-700',
                    'bg-blue-100 text-blue-700',
                    'bg-yellow-100 text-yellow-700',
                  ][i % 4]}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{skill.desc}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Diperoleh sekitar 1 tahun lalu
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Skills() {
  const [selected, setSelected] = useState(null);

  const enriched = useMemo(() => skills, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen transition-colors duration-300">
      <section className="py-16 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Keahlian Saya</h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          Telusuri keahlian saya di berbagai bidang teknologi dan pengembangan perangkat lunak.
        </p>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {enriched.map((skill) => (
            <SkillCard key={skill.name} skill={skill} onClick={setSelected} />
          ))}
        </div>
      </section>

      <SkillModal skill={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
