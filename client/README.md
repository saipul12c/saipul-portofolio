## 📌 Project Overview

**Nama Proyek:** Portfolio Website
**Stack:** React + Vite + Tailwind CSS
**Tujuan:** Menampilkan informasi personal, keahlian, sertifikat, blog, catatan rilis, FAQ, komitmen, dan widget bantuan (termasuk live chat) dalam satu SPA modern, responsif, serta mendukung mode terang/gelap.

---

## 📝 Changelog

### Versi 1.3.3 (2025-05-19)

Memperbaiki dan menyelaraskan semua komponen sesuai arsitektur baru `RouteController`, routing dinamis, dan konsistensi UI/UX.

#### 🔹 `RouteController.jsx`

* **GuardedRoute menerima `children`** bukan prop `element`, sehingga rute terlindungi dapat merender konten anak langsung.
* Menambahkan logika `useCallback` pada handler untuk mencegah peringatan lint.
* Menyinkronkan API: `lockRoutes`, `unlockRoutes`, dan `allowAccessWithKey` tetap bekerja dengan `Set` dan `Map`.
* `RouteControllerUI` tetap berfungsi sebagai panel admin, dengan state `durations` yang diinisialisasi berdasarkan `availableRoutes`.

#### 🔹 `App.jsx`

* Membungkus seluruh aplikasi dengan `<RouteControllerProvider>`.
* Pindahkan inisialisasi tema ke dalam `useEffect` di `AppContent`.
* Konsisten menggunakan `<GuardedRoute>` dengan prop `children` untuk rute yang terkunci (`/proyek`, `/pendidikan`, `/testimoni`, dll.).
* Tambahkan `PengembanganWithUnlock` untuk memicu `unlockRoutes` saat selesai, menggantikan direct callback ke komponen `Pengembangan`.

#### 🔹 `pengembangan.jsx`

* Pindahkan `handleFinishAndRedirect` ke `useCallback` dengan dependency `[onFinish, navigate, location.search]`.
* Tambahkan `secondsLeft` guard (`Math.max`) agar tidak negatif.
* Sesuaikan progress bar untuk menghitung ulang dengan benar dan transisi 1 detik.
* Tambahkan timer cleanup (interval + timeout) di `useEffect`.

#### 🔹 `Testimoni.jsx`

* Ganti ikon outline (`Star as StarOutline`) menjadi `StarOff` untuk bintang kosong.
* Konsisten menggunakan `Star`, `StarHalf`, dan `StarOff` di fungsi `renderStars`.
* Pertahankan tampilan rata‑rata rating dengan `useMemo` dan animasi `framer-motion`.

#### 🔹 `pendidikan.jsx`

* Bungkus semua handler (`prev`, `next`, `goTo`, `handleOpen`, `handleClose`) dengan `useCallback`.
* Perbaiki `key` dan `alt` pada elemen media untuk aksesibilitas.
* Pertahankan struktur `AnimatePresence` + `motion` untuk modal dan carousel.

#### 🔹 `Proyek.jsx`

* Ubah `<Link href="…">` menjadi `<Link to="…">` sesuai `react-router-dom`.
* Normalisasi path: tautan ke `/proyek/[slug]` (bukan `/A/detail-proyek/[slug]`).
* Gunakan `whileHover` & `whileTap` dari `framer-motion` untuk efek interaktif.

#### 🔹 `detail-proyek.jsx`

* Ganti penggunaan `useRouter()` menjadi `useParams()` & `useNavigate()` dari `react-router-dom`.
* Tangkap `slug` dari URL (`/proyek/:slug`) dan cari data di `proyek.json`.
* Tampilkan tombol “← Kembali” dengan `navigate(-1)`.
* Tambahkan animasi masuk lembut dengan `motion.section` dan offset `y`.

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
