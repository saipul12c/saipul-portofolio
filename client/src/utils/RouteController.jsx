// src/utils/RouteController.jsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback
} from "react";
import { Navigate } from "react-router-dom";

/**
 * Context untuk mengontrol status lock/unlock routes,
 * serta memberikan akses via key.
 */
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
  // Set of locked paths
  const [lockedRoutes, setLockedRoutes] = useState(new Set());
  // Map key -> Set(paths)
  const [allowKeyedRoutes, setAllowKeyedRoutes] = useState(new Map());

  const lockRoutes = useCallback((paths = [], durationMs) => {
    setLockedRoutes(prev => {
      const next = new Set(prev);
      paths.forEach(p => next.add(p));
      return next;
    });
    if (durationMs && durationMs > 0) {
      setTimeout(() => {
        setLockedRoutes(prev => {
          const next = new Set(prev);
          paths.forEach(p => next.delete(p));
          return next;
        });
      }, durationMs);
    }
  }, []);

  const unlockRoutes = useCallback(paths => {
    setLockedRoutes(prev => {
      const next = new Set(prev);
      paths.forEach(p => next.delete(p));
      return next;
    });
  }, []);

  const allowAccessWithKey = useCallback((key, paths = []) => {
    setAllowKeyedRoutes(prev => {
      const next = new Map(prev);
      next.set(key, new Set(paths));
      return next;
    });
  }, []);

  const value = {
    lockedRoutes,
    allowKeyedRoutes,
    lockRoutes,
    unlockRoutes,
    allowAccessWithKey
  };

  return (
    <RouteControllerContext.Provider value={value}>
      {children}
    </RouteControllerContext.Provider>
  );
}

/**
 * <GuardedRoute>
 * Membungkus Route biasa, memeriksa lock & key sebelum render.
 */
export function GuardedRoute({
  path,
  children,
  fallbackPath = "/pengembangan",
  requiredKey
}) {
  const { lockedRoutes, allowKeyedRoutes } = useRouteController();
  const isLocked = lockedRoutes.has(path);

  let allow = !isLocked;
  if (isLocked && requiredKey) {
    const keySet = allowKeyedRoutes.get(requiredKey);
    allow = keySet?.has(path) || false;
  }

  return allow
    ? children
    : <Navigate
        to={`${fallbackPath}?redirect=${encodeURIComponent(path)}`}
        replace
      />;
}

/**
 * RouteControllerUI
 * Panel admin untuk melihat & kontrol lock/unlock routes secara visual.
 * - Estetik & simple dengan TailwindCSS
 * - Responsif: grid pada desktop, list pada mobile
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
  const [durations, setDurations] = useState(
    availableRoutes.reduce((acc, path) => {
      acc[path] = 5000;
      return acc;
    }, {})
  );

  const toggleRoute = route => {
    if (lockedRoutes.has(route)) {
      unlockRoutes([route]);
    } else {
      lockRoutes([route], durations[route]);
    }
  };

  const handleDurationChange = (route, value) => {
    setDurations(prev => ({
      ...prev,
      [route]: Number(value)
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Route Controller Panel
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableRoutes.map(route => {
          const locked = lockedRoutes.has(route);
          return (
            <div
              key={route}
              className="border rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow bg-white flex flex-col justify-between"
            >
              <div>
                <p className="font-medium text-lg text-gray-700 break-words">
                  {route}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Status:&nbsp;
                  <span
                    className={
                      locked
                        ? "text-red-600 font-semibold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    {locked ? "Terkunci" : "Terbuka"}
                  </span>
                </p>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  className="w-20 px-2 py-1 border rounded-lg focus:outline-none"
                  value={durations[route]}
                  onChange={e =>
                    handleDurationChange(route, e.target.value)
                  }
                />
                <span className="text-sm text-gray-600">ms</span>
                <button
                  onClick={() => toggleRoute(route)}
                  className={`ml-auto px-4 py-2 rounded-full text-white ${
                    locked ? "bg-green-500" : "bg-red-500"
                  } hover:opacity-90 transition-opacity`}
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
