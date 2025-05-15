// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Blog from './pages/Blog';
import Sertifikat from './pages/Sertifikat';
import KontakAdmin from './pages/KontakAdmin';
import ErrorPage from './error/ErrorPage';

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
            {/* Catch‑all untuk 404 */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
