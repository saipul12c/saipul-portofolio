## 📌 Project Overview

**Nama Proyek:** Portfolio Website
**Stack:** React + Vite + Tailwind CSS
**Tujuan:** Menampilkan informasi personal, keahlian, sertifikat, blog, catatan rilis, FAQ, komitmen, dan widget bantuan (termasuk live chat) dalam satu SPA modern, responsif, serta mendukung mode terang/gelap.

---

## 📝 Changelog

### Versi 1.4.6 (2025-05-24)

#### 🔹 `AiVersion.jsx`

✅ **Perombakan Tampilan Penuh (tanpa popup):**
Menampilkan langsung informasi versi AI secara penuh di halaman `/ai-version`, tanpa membutuhkan klik tombol “?”.

✅ **Struktur Informasi Lebih Lengkap dan Rapi:**

* Menampilkan metadata rilis: versi, tanggal, dan penulis.
* Menampilkan info kompatibilitas minimum dan daftar browser yang diuji.
* Daftar *known issues* dan *release notes* dibagi ke dalam: `New Features`, `Improvements`, `Bug Fixes`.

✅ **Visual Enhancement & Konsistensi UI:**

* Bullet teks ditingkatkan dari list standar menjadi elemen fleksibel dengan ikon `FiCheckCircle`.
* Perbaikan terhadap tampilan list yang sebelumnya terlihat seperti huruf "o" kecil.
* Tampilan lebih profesional dan readable baik di desktop maupun mobile.

✅ **Dark Mode Support:**

* Semua elemen mendukung `dark:bg-*`, `dark:text-*`, dan transisi dengan `transition-colors duration-300`.

✅ **Reusable Helper:**

* Fungsi `renderNoteGroup` untuk mencetak grup release notes secara modular dan konsisten.

#### 🔹 `Proyek.jsx`

✅ **Kalimat Pengenalan Baru:**

* Menambahkan kalimat menarik di bawah judul:
  *"Jelajahi berbagai proyek yang telah saya kembangkan dengan teknologi modern, solusi nyata, dan semangat inovatif."*

✅ **Fitur Pencarian:**

* Input pencarian berbasis state untuk memfilter daftar proyek berdasarkan judul.

✅ **Peningkatan Tampilan Kartu:**

* Menampilkan badge status (`projectStage`) dan periode (`developmentPeriod`).
* Menampilkan sebagian `technologies` dan demo link jika tersedia.
* Desain kartu proyek mendukung dark mode dan responsif.
 
#### 🔹 `detail-proyek.jsx`

✅ **Penyesuaian dengan Struktur JSON Baru:**

* Menampilkan semua informasi proyek: `overview`, `background`, `objectives`, `technologies`, `features`, `benefits`, `strengths`, `limitations`, `projectStage`, `deploymentUrl`, dll.

✅ **Visual & UX:**

* Penyajian data proyek dibagi ke dalam section-section yang rapi dan mudah dibaca.
* Semua field opsional ditampilkan hanya jika tersedia.
* Mendukung desain penuh di dark mode.

#### 🔹 `proyek.json` (struktur data)

✅ **Struktur JSON Ditingkatkan:**

* Penambahan field penting: `overview`, `background`, `objectives`, `technologies`, `features`, `benefits`, `strengths`, `limitations`, `projectStage`, `deploymentUrl`, `repositoryUrl`, `client`, `screenshots`, `testimonials`, `maintenancePlan`, `futurePlans`.

✅ **Deskripsi & Narasi Lebih Profesional:**

* Setiap proyek menggunakan narasi teknis yang menjelaskan teknologi, manfaat, dan kelebihan dengan detail.

✅ **Skalabilitas & Reusability:**

* Struktur kini mendukung tampilan mendalam di UI proyek dan integrasi ke API atau CMS jika dibutuhkan.

> 🔧 **Catatan Teknis Umum:**
>
> * Semua halaman mendukung **dark mode otomatis** berdasarkan preferensi sistem (`prefers-color-scheme`).
> * Utility class TailwindCSS seperti `dark:*`, `transition-colors`, `shadow-*`, dan `bg-gradient-to-r` digunakan secara konsisten untuk pengalaman visual yang mulus.
> * Komponen UI kini lebih terstruktur dan modular, mudah dikembangkan ke versi berikutnya.


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
