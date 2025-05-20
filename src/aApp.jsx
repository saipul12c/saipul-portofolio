// src/App.jsx
import React, { useEffect, useState }    from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar         from './components/Navbar';
import Footer         from './components/Footer';
import HelpWidget     from './components/HelpWidget';

import Home           from './pages/Home';
import About          from './pages/About';
import Skills         from './pages/Skills';
import Blog           from './pages/Blog';
import Sertifikat     from './pages/Sertifikat';
import KontakAdmin    from './pages/KontakAdmin';
import ErrorPage      from './error/ErrorPage';

import ReleaseNotes   from './pages/v/ReleaseNotes';
import FAQ            from './pages/v/FAQ';
import Komitmen       from './pages/v/Komitmen';
import AiVersion      from './pages/v/AiVersion';

import Proyek         from './pages/proyek/Proyek';
import DetailProyek   from './pages/proyek/A/Detail-Proyek';

import Pendidikan     from './pages/p/pendidikan';
import Testimoni      from './pages/tes/Testimoni';

import Pengembangan   from './pages/alih/Pengembangan';  // halaman under construction

import { initTheme }  from './utils/theme';

function App() {
  // true = semua route “proyek/pendidikan/detail-proyek/testimoni” redirect dulu
  const [underDevelopment, setUnderDevelopment] = useState(true);

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>

            {/* Public pages */}
            <Route path="/"           element={<Home />} />
            <Route path="/about"      element={<About />} />
            <Route path="/skills"     element={<Skills />} />
            <Route path="/sertifikat" element={<Sertifikat />} />
            <Route path="/blog"       element={<Blog />} />
            <Route path="/kontak"     element={<KontakAdmin />} />

            <Route path="/release-notes" element={<ReleaseNotes />} />
            <Route path="/faq"           element={<FAQ />} />
            <Route path="/komitmen"      element={<Komitmen />} />
            <Route path="/ai-version"    element={<AiVersion />} />

            {/* Halaman Pengembangan */}
            <Route
              path="/pengembangan"
              element={
                <Pengembangan
                  onFinish={() => setUnderDevelopment(false)}
                  duration={5000}  /* misal 5 detik */
                />
              }
            />

            {/* Ini yang kita “tutup sementara” */}
            <Route
              path="/proyek"
              element={
                underDevelopment
                  ? <Navigate to="/pengembangan" replace />
                  : <Proyek />
              }
            />
            <Route
              path="/proyek/:slug"
              element={
                underDevelopment
                  ? <Navigate to="/pengembangan" replace />
                  : <DetailProyek />
              }
            />
            <Route
              path="/pendidikan"
              element={
                underDevelopment
                  ? <Navigate to="/pengembangan" replace />
                  : <Pendidikan />
              }
            />
            <Route
              path="/detail-proyek"
              element={
                underDevelopment
                  ? <Navigate to="/pengembangan" replace />
                  : <DetailProyek />
              }
            />
            <Route
              path="/testimoni"
              element={
                underDevelopment
                  ? <Navigate to="/pengembangan" replace />
                  : <Testimoni />
              }
            />

            {/* Catch‑all */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>

        <Footer />
        <HelpWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
