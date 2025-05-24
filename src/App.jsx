// src/App.jsx
import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';

import Navbar       from './components/Navbar';
import Footer       from './components/Footer';
import HelpWidget   from './components/HelpWidget';

import Home         from './pages/Home';
import About        from './pages/About';
import Skills       from './pages/Skills';
import Blog         from './pages/Blog';
import BlogDetail   from './pages/BlogDetail';
import Sertifikat   from './pages/Sertifikat';
import KontakAdmin  from './pages/KontakAdmin';
import Author       from './pages/author/Author'
import ErrorPage    from './error/ErrorPage';

import ReleaseNotes from './pages/v/ReleaseNotes';
import FAQ          from './pages/v/FAQ';
import Komitmen     from './pages/v/Komitmen';
import AiVersion    from './pages/v/AiVersion';

import Proyek       from './pages/proyek/Proyek';
import DetailProyek from './pages/proyek/A/detail-proyek';

import Pendidikan   from './pages/p/pendidikan';
import Testimoni    from './pages/tes/Testimoni';

import Pengembangan from './pages/alih/Pengembangan';
import { initTheme } from './utils/theme';

import {
  RouteControllerProvider,
  GuardedRoute,
  RouteControllerUI,
  useRouteController
} from './utils/RouteController';

// Ambil durasi kunci dari ENV (misal di .env: VITE_LOCK_DURATION_MS=10000)
const LOCK_DURATION = Number(import.meta.env.VITE_LOCK_DURATION_MS) || 5000;

function RouteControlPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const secret = params.get('secretcode');
  const valid = secret === import.meta.env.VITE_ROUTE_CONTROL_CODE;

  return valid
    ? <RouteControllerUI />
    : <Navigate to="*" replace />;
}

function PengembanganWithUnlock({ duration, onFinish, ...rest }) {
  const { unlockRoutes } = useRouteController();

  const handleFinish = () => {
    // Buka rute yang terkunci
    unlockRoutes([
      '/proyek',
      '/proyek/:slug',
      '/pendidikan',
      '/detail-proyek',
      '/testimoni',
    ]);
    // Panggil callback tambahan (flushSync sudah di-handle di Pengembangan.jsx)
    if (onFinish) onFinish();
  };

  return (
    <Pengembangan
      {...rest}
      duration={duration}
      onFinish={handleFinish}
    />
  );
}

function AppContent() {
  const { lockRoutes } = useRouteController();

  useEffect(() => {
    initTheme();
  }, []);

  useEffect(() => {
    // Kunci rute sesuai LOCK_DURATION yang bisa diatur lewat ENV
    lockRoutes(
      [
        '/proyek',
        '/proyek/:slug',
        '/pendidikan',
        '/detail-proyek',
        '/testimoni',
      ],
      LOCK_DURATION
    );
  }, [lockRoutes]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public pages */}
          <Route path="/"                     element={<Home />} />
          <Route path="/about"                element={<About />} />
          <Route path="/skills"               element={<Skills />} />
          <Route path="/sertifikat"           element={<Sertifikat />} />
          <Route path="/blog"                 element={<Blog />} />
          <Route path="/blog/:slug"           element={<BlogDetail />} /> {/* Tambahkan ini */}
          <Route path="/Author/:username"     element={<Author />} />
          <Route path="/kontak"               element={<KontakAdmin />} />

          {/* Versioned pages */}
          <Route path="/release-notes" element={<ReleaseNotes />} />
          <Route path="/faq"           element={<FAQ />} />
          <Route path="/komitmen"      element={<Komitmen />} />
          <Route path="/ai-version"    element={<AiVersion />} />

          {/* Route Control (secret) */}
          <Route
            path="/route-control"
            element={<RouteControlPage />}
          />

          {/* Under Construction with unlock callback */}
          <Route
            path="/pengembangan"
            element={
              <PengembanganWithUnlock duration={LOCK_DURATION} />
            }
          />

          {/* Protected / Under Development */}
          <Route
            path="/proyek"
            element={
              <GuardedRoute
                fallbackPath="/pengembangan"
                path="/proyek"
              >
                <Proyek />
              </GuardedRoute>
            }
          />
          <Route
            path="/proyek/:slug"
            element={
              <GuardedRoute
                fallbackPath="/pengembangan"
                path="/proyek/:slug"
              >
                <DetailProyek />
              </GuardedRoute>
            }
          />
          <Route
            path="/pendidikan"
            element={
              <GuardedRoute
                fallbackPath="/pengembangan"
                path="/pendidikan"
              >
                <Pendidikan />
              </GuardedRoute>
            }
          />
          <Route
            path="/detail-proyek"
            element={
              <GuardedRoute
                fallbackPath="/pengembangan"
                path="/detail-proyek"
              >
                <DetailProyek />
              </GuardedRoute>
            }
          />
          <Route
            path="/testimoni"
            element={
              <GuardedRoute
                fallbackPath="/pengembangan"
                path="/testimoni"
              >
                <Testimoni />
              </GuardedRoute>
            }
          />

          {/* Catch‑all */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
      <HelpWidget />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteControllerProvider>
        <AppContent />
      </RouteControllerProvider>
    </BrowserRouter>
  );
}
