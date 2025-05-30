// src/utils/RouteController.jsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback
} from "react";
import { Navigate } from "react-router-dom";

/**
 * DEFAULT_LOCK_DURATION
 * Baca dari .env (VITE_LOCK_DURATION_MS), fallback ke 5000ms.
 * Ini adalah durasi default yang digunakan di admin panel.
 */
const DEFAULT_LOCK_DURATION = Number(import.meta.env.VITE_LOCK_DURATION_MS) || 5000;

////////////////////////////////////////////////////////////////////////////////
// Context & Provider
////////////////////////////////////////////////////////////////////////////////

const RouteControllerContext = createContext(null);

export const useRouteController = () => {
  const ctx = useContext(RouteControllerContext);
  if (!ctx) {
    throw new Error(
      "useRouteController harus dipakai di dalam <RouteControllerProvider>"
    );
  }
  return ctx;
};

export function RouteControllerProvider({ children }) {
  // Set berisi path yang sedang terkunci
  const [lockedRoutes, setLockedRoutes] = useState(new Set());
  // Map key -> Set(path) untuk akses berbasis kunci khusus
  const [allowKeyedRoutes, setAllowKeyedRoutes] = useState(new Map());

  /**
   * lockRoutes(paths, durationMs)
   * Tambah paths ke lockedRoutes, lalu otomatis unlock setelah durationMs.
   */
  const lockRoutes = useCallback((paths = [], durationMs) => {
    setLockedRoutes(prev => {
      const next = new Set(prev);
      paths.forEach(p => next.add(p));
      return next;
    });
    if (durationMs > 0) {
      setTimeout(() => {
        setLockedRoutes(prev => {
          const next = new Set(prev);
          paths.forEach(p => next.delete(p));
          return next;
        });
      }, durationMs);
    }
  }, []);

  /**
   * unlockRoutes(paths)
   * Hapus paths dari lockedRoutes sekarang juga.
   */
  const unlockRoutes = useCallback(paths => {
    setLockedRoutes(prev => {
      const next = new Set(prev);
      paths.forEach(p => next.delete(p));
      return next;
    });
  }, []);

  /**
   * allowAccessWithKey(key, paths)
   * Beri izin bypass untuk paths tertentu dengan kunci khusus.
   */
  const allowAccessWithKey = useCallback((key, paths = []) => {
    setAllowKeyedRoutes(prev => {
      const next = new Map(prev);
      next.set(key, new Set(paths));
      return next;
    });
  }, []);

  return (
    <RouteControllerContext.Provider
      value={{
        lockedRoutes,
        allowKeyedRoutes,
        lockRoutes,
        unlockRoutes,
        allowAccessWithKey
      }}
    >
      {children}
    </RouteControllerContext.Provider>
  );
}

////////////////////////////////////////////////////////////////////////////////
// GuardedRoute
////////////////////////////////////////////////////////////////////////////////

/**
 * <GuardedRoute>
 * - path: identifier route (harus sama string-nya)
 * - children: Komponen halaman jika diizinkan
 * - fallbackPath: ke mana dialihkan kalau terkunci
 * - requiredKey: kunci bypass
 */
export function GuardedRoute({
  path,
  children,
  fallbackPath = "/Pengembangan",
  requiredKey
}) {
  const { lockedRoutes, allowKeyedRoutes } = useRouteController();
  const isLocked = lockedRoutes.has(path);

  let allowed = !isLocked;
  if (isLocked && requiredKey) {
    const keySet = allowKeyedRoutes.get(requiredKey);
    allowed = keySet?.has(path) || false;
  }

  return allowed
    ? children
    : (
      <Navigate
        to={`${fallbackPath}?redirect=${encodeURIComponent(path)}`}
        replace
      />
    );
}

////////////////////////////////////////////////////////////////////////////////
// RouteControllerUI (Admin Panel)
////////////////////////////////////////////////////////////////////////////////

/**
 * Panel admin untuk melihat & kontrol lock/unlock route.
 * Props:
 *  - availableRoutes: daftar route yang bisa dikontrol
 */
export function RouteControllerUI({
  availableRoutes = [
    "/proyek",
    "/proyek/:slug",
    "/pendidikan",
    "/detail-proyek",
    "/testimoni"
  ]
}) {
  const { lockedRoutes, lockRoutes, unlockRoutes } = useRouteController();

  // State durasi per route (in ms), default dari DEFAULT_LOCK_DURATION
  const [durations, setDurations] = useState(
    Object.fromEntries(
      availableRoutes.map(route => [route, DEFAULT_LOCK_DURATION])
    )
  );

  // Toggle lock/unlock untuk satu route
  const toggleRoute = route => {
    if (lockedRoutes.has(route)) {
      unlockRoutes([route]);
    } else {
      lockRoutes([route], durations[route]);
    }
  };

  // Update durasi sebelum toggle
  const handleDurationChange = (route, value) => {
    setDurations(prev => ({
      ...prev,
      [route]: Number(value)
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Route Controller Panel
      </h2>
      <p className="mb-4 text-gray-600">
        Ubah durasi (ms) lalu klik tombol Kunci/Buka.
        Default durasi: <strong>{DEFAULT_LOCK_DURATION} ms</strong>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableRoutes.map(route => {
          const locked = lockedRoutes.has(route);
          return (
            <div
              key={route}
              className="border rounded-2xl p-4 shadow-sm hover:shadow-lg bg-white flex flex-col justify-between"
            >
              <div>
                <p className="font-medium text-lg text-gray-700 break-words">
                  {route}
                </p>
                <p className="text-sm mt-1">
                  Status:{" "}
                  <span className={locked ? "text-red-600" : "text-green-600"}>
                    {locked ? "Terkunci" : "Terbuka"}
                  </span>
                </p>
              </div>
              <div className="mt-4 flex items-center">
                <input
                  type="number"
                  min="0"
                  className="w-20 px-2 py-1 border rounded-lg focus:outline-none"
                  value={durations[route]}
                  onChange={e =>
                    handleDurationChange(route, e.target.value)
                  }
                />
                <span className="ml-2 text-gray-600">ms</span>
                <button
                  onClick={() => toggleRoute(route)}
                  className={`ml-auto px-4 py-2 rounded-full text-white ${
                    locked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                  } transition-colors`}
                >
                  {locked ? "Buka" : "Kunci"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
