// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HelpWidget from './components/HelpWidget';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Blog from './pages/Blog';
import Sertifikat from './pages/Sertifikat';
import KontakAdmin from './pages/KontakAdmin';
import ErrorPage from './error/ErrorPage';

import ReleaseNotes from './pages/v/ReleaseNotes';
import FAQ          from './pages/v/FAQ';
import Komitmen     from './pages/v/Komitmen';
import AiVersion    from './pages/v/AiVersion';

import { initTheme } from './utils/theme';

function App() {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/sertifikat" element={<Sertifikat />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/kontak" element={<KontakAdmin />} />

            {/* Halaman baru */}
            <Route path="/release-notes" element={<ReleaseNotes />} />
            <Route path="/faq"           element={<FAQ />} />
            <Route path="/komitmen"      element={<Komitmen />} />

            {/* Catch‑all untuk 404 */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>

        <Footer />

        {/* Widget bantuan selalu aktif */}
        <HelpWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
