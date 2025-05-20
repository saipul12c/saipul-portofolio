// src/utils/theme.js

// Ambil tema yang disimpan di localStorage
export const getStoredTheme = () => localStorage.getItem('theme');

// Simpan tema ke localStorage
export const setStoredTheme = (theme) => localStorage.setItem('theme', theme);

// Terapkan tema ke <html> dengan menambahkan/menghapus class 'dark'
export const applyTheme = (theme) => {
  const html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};

// Inisialisasi tema saat halaman load
export const initTheme = () => {
  const stored = getStoredTheme();
  if (
    stored === 'dark' ||
    (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
};

// Toggle tema antara 'dark' dan 'light', lalu simpan ke localStorage
export const toggleTheme = () => {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  setStoredTheme(isDark ? 'dark' : 'light');
};
