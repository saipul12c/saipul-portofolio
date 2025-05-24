## 📌 Project Overview

**Nama Proyek:** Portfolio Website
**Stack:** React + Vite + Tailwind CSS
**Tujuan:** Menampilkan informasi personal, keahlian, sertifikat, blog, catatan rilis, FAQ, komitmen, dan widget bantuan (termasuk live chat) dalam satu SPA modern, responsif, serta mendukung mode terang/gelap.

---

## 📝 Changelog

### Versi 1.4.5 (2025-05-24)

Menambahkan **dukungan dark mode otomatis** berdasarkan preferensi sistem pengguna serta menyempurnakan UI untuk konsistensi warna dan visibilitas.

### 🔹 `FAQ.jsx`

✅ **Dark Mode Support:**

* Menambahkan `dark:bg-gray-900`, `dark:text-gray-100`, `dark:border-gray-700` ke seluruh elemen UI.
* Input search, card FAQ, dan tag sudah dioptimalkan tampilannya untuk mode malam.

✅ **Visual Enhancement:**

* Transisi warna halus antar mode dengan `transition-colors duration-300`.
* Menghindari `bg-white` statis dengan mengganti menggunakan `dark:bg-*`.
* Tag warna menyesuaikan agar tidak terlalu terang di dark mode.

✅ **Konsistensi Desain:**

* Menyatu dengan desain `Navbar` dan `Footer`.

### 🔹 `Proyek.jsx`

✅ **Dark Mode Support:**

* Background diganti dengan `bg-gray-50 dark:bg-gray-900`.
* Semua teks memiliki `dark:text-*` agar terbaca di mode malam.
* Kartu proyek pakai `dark:bg-gray-800` dan `dark:shadow-md`.

✅ **Visual Enhancement:**

* Tetap mempertahankan nuansa bersih di siang hari, dan dalam di malam hari.

### 🔹 `Detail-Proyek.jsx`

✅ **Dark Mode Support:**

* Section dan teks diberi `dark:bg-gray-900`, `dark:text-gray-100`, dll.
* Tombol kembali diberi `dark:text-blue-400` agar tetap terlihat di dark mode.

✅ **Visual Fix:**

* Border dan teks dijaga kontrasnya di kedua mode.

### 🔹 `Pendidikan.jsx`

✅ **Dark Mode Support:**

* Latar belakang diperbaiki dengan gradient `dark:from-gray-900 dark:to-gray-800`.
* Komponen semi-transparan (`bg-white bg-opacity-60`) disesuaikan: `dark:bg-gray-800 dark:bg-opacity-70`.

✅ **Modal Dark Mode:**

* Modal diberi latar `dark:bg-gray-900`, ikon dengan `dark:text-gray-200`.
* Tombol navigasi carousel mendukung dark mode penuh.

✅ **Timeline UI:**

* Garis vertikal timeline diberi gradient `dark:from-indigo-600 dark:to-purple-700`.
* Dot penanda di tengah timeline diganti `dark:bg-gray-200`.

✅ **Aksesibilitas Teks:**

* Semua teks memiliki `dark:text-gray-100`, `dark:text-gray-300`, dll agar tetap terbaca di mode malam.


> 🔧 **Catatan Teknis:**

* Tidak ada toggle dark mode manual, UI otomatis mengikuti preferensi sistem (CSS `prefers-color-scheme`).
* Semua perubahan menggunakan utility class TailwindCSS `dark:` dan transisi visual untuk mode ganda.
---

## 🧩 Tech Stack

| Teknologi           | Deskripsi                                         |
| ------------------- | ------------------------------------------------- |
| Vite + React        | Framework utama SPA                               |
| Tailwind CSS        | Utility-first styling                             |
| React Icons         | Ikon visual di navbar & footer                    |
| Swiper.js           | Carousel sertifikat                               |
| React State & Hooks | Mengatur data, modal, widget, tema, dan live chat |
| date-fns            | Formatting tanggal “updated x ago”                |
| React Router        | Routing multi-halaman                             |
| Dark Mode Toggle    | Switch siang/malam via `theme.js`                 |

---

## 🗂️ Folder Structure

```plaintext
public/
└─ favicon, images, dll

src/
├─ assets/                   # Gambar & ikon tambahan
├─ components/
│  ├─ Navbar.jsx
│  ├─ Footer.jsx
│  └─ HelpWidget.jsx         # Tombol “?” + panel rilis, FAQ, komitmen & live chat
│  └─ AiVersion.jsx          # Halaman & komponen detail versi AI
├─ data/                     # JSON data statis
│  ├─ releaseNotes.json
│  ├─ aiVersion.json         # Versi AI + metadata lengkap
│  ├─ FAQ.json
│  └─ komitmen.json
├─ pages/
│  ├─ Home.jsx
│  ├─ About.jsx
│  ├─ Skills.jsx
│  ├─ Sertifikat.jsx
│  ├─ Blog.jsx
│  ├─ KontakAdmin.jsx
│  └─ v/                     # Folder untuk halaman “utility”
│     ├─ ReleaseNotes.jsx
│     ├─ FAQ.jsx
│     ├─ Komitmen.jsx
│     └─ AiVersion.jsx       # Halaman detail AI version
├─ error/
│  └─ ErrorPage.jsx
├─ utils/
│  ├─ slugify.js
│  └─ theme.js               # Pengatur light/dark mode
├─ App.jsx                   # Root app + routing + HelpWidget
├─ main.jsx                  # Entry point React
└─ vite.config.js
```

---

## 🚀 Setup & Installasi

```bash
# 1. Clone repository
git clone https://github.com/saipul12c/saipul-portofolio.git

# 2. Masuk ke folder proyek
cd portfolio

# 3. Install dependencies
npm install

# 4. Jalankan local server
npm run dev
```

---

## 🌗 Mode Gelap / Terang

Kontrol via `src/utils/theme.js`. Tombol di navbar mengubah class `dark` di `<html>`.
Tailwind akan otomatis mengatur gaya sesuai mode.

```js
// src/utils/theme.js
export function initTheme() {
  // baca preferensi user atau sistem, apply .dark
}
export function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}
```

---

## 📄 Halaman & Route

| Path             | Komponen       | Deskripsi                                         |
| ---------------- | -------------- | ------------------------------------------------- |
| `/`              | `Home`         | Landing interaktif                                |
| `/about`         | `About`        | Latar belakang & bio singkat                      |
| `/skills`        | `Skills`       | Daftar skill + pop-up detail                      |
| `/sertifikat`    | `Sertifikat`   | Carousel sertifikat + modal detail                |
| `/blog`          | `Blog`         | Daftar artikel + link detail                      |
| `/kontak`        | `KontakAdmin`  | Form kontak & informasi admin                     |
| `/release-notes` | `ReleaseNotes` | Versi aplikasi & daftar catatan rilis             |
| `/faq`           | `FAQ`          | Daftar pertanyaan umum                            |
| `/komitmen`      | `Komitmen`     | Komitmen proyek (privasi, akurasi, respons cepat) |
| `/ai-version`    | `AiVersion`    | Halaman detail versi & metadata Saipul AI         |
| `*`              | `ErrorPage`    | Halaman 404                                       |

---

## 💡 Fitur Unggulan

### 🆕 Help Widget (“?”)

* **Tombol “?”** di pojok kanan bawah, selalu tampil.
* Panel popup berisi:

  1. **Catatan Rilis** – tautan “Lihat Rilis”.
  2. **Versi** & **Diperbarui** tepat di bawah “Lihat Rilis”, gaya kecil dan netral.
  3. **Link** lain: FAQ, Komitmen, Versi AI.
  4. **Live Chat** – tombol “Mulai Chat”, fallback port 7000 mati dengan pesan humor.
* Klik di luar otomatis menutup.

### ✅ Skills Pop-up

* Klik skill → modal dengan detail, tag acak, label “Baru” (<1 tahun), latar blur.

### ✅ Sertifikat Carousel

* **Swiper.js**, responsive, dengan modal detail & efek blur/overlay.

### ✅ Theme Toggle

* Tombol di Navbar mengubah `dark` class, memanfaatkan Tailwind `dark:` utilities.

---

## 📱 Responsivitas

✔️ Mobile
✔️ Tablet
✔️ Desktop
✔️ Retina-ready
✔️ UI ringan dan optimal

---

## 🛠️ Development Tips

* Tambahkan favicon & meta SEO di `index.html`.
* Ganti semua placeholder dengan konten nyata.
* Gunakan lazy-loading untuk gambar besar.
* Deploy di Netlify / Vercel untuk hosting gratis & CI/CD.

---

## 🧾 Lisensi

MIT License — bebas digunakan & dimodifikasi.

---

## 🙋‍♂️ Pengembang

**Nama:** Muhammad Syaiful Mukmin
**Peran:** Fullstack Developer & Guru
