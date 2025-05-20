import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ page, onChange, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="inline-flex items-center space-x-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="p-2 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-700 disabled:opacity-50 transition"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`
            px-3 py-1 rounded-md
            ${p === page
              ? "bg-indigo-500 text-white"
              : "bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-slate-600"}
            transition
          `}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="p-2 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-700 disabled:opacity-50 transition"
      >
        <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
    </nav>
  );
};
