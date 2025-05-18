## 📌 Project Overview

**Nama Proyek:** Portfolio Website
**Stack:** React + Vite + Tailwind CSS
**Tujuan:** Menampilkan informasi personal, keahlian, sertifikat, blog, catatan rilis, FAQ, komitmen, dan widget bantuan (termasuk live chat) dalam satu SPA modern, responsif, serta mendukung mode terang/gelap.

---

## 📝 Changelog

### Versi 1.1.0 (2025-05-18)

* **aiVersion.json**

  * Bump ke `1.1.0`
  * Tambah metadata lengkap: `releaseDate`, `author`, `notes` (newFeatures, improvements, bugFixes), `compatibility`, `knownIssues`.

* **HelpWidget.jsx**

  * Tombol “?” diperkecil (8×8), posisinya bottom-right.
  * Popup panel muncul di samping tombol, tanpa menutupi.
  * Link “Lihat Rilis” dipisah, diikuti oleh `Versi` & `Diperbarui` dengan teks kecil.
  * Tambah link ke `/ai-version`.
  * Deteksi port 7000 tiap 30 detik; jika mati, tampilkan pesan humor.
  * Mode terang/gelap otomatis via `initTheme()`.

* **AiVersion.jsx**

  * Komponen baru menampilkan data `aiVersion.json` terstruktur.
  * Desain responsif: header gradient, grid, kartu shadow.
  * Konsisten dengan `dark:` Tailwind.

### Versi 1.2.0 (2025-05-18)

* **ReleaseNotes.jsx**

  * Mode siang/malam: `initTheme()` & `toggleTheme`.
  * Pencarian versi, author, dan catatan.
  * Layout responsif (`max-w-4xl`), kartu modern.
* **Komitmen.jsx**

  * Tampilkan data `komitmen.json` sebagai kartu interaktif.
  * Fitur pencarian & filter kategori.
  * Sorting prioritas, badge status berwarna, Framer Motion hover.
  * Ikon search, filter, toggle tema (`lucide-react`).
* **FAQ.jsx**

  * Pencarian dinamis memfilter pertanyaan, jawaban, tag.
  * Collapsible FAQ dengan animasi `AnimatePresence`.
  * Ikon expand/collapse (`react-icons` FiPlus/FiMinus).
  * Warna tag variatif kompatibel mode terang/gelap.
  * Desain responsif, kartu minimalis dengan hover.

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
