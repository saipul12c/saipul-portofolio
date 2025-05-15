## 📌 Project Overview

**Nama Proyek:** Portfolio Website
**Stack:** React + Vite + Tailwind CSS
**Tujuan:** Menampilkan informasi personal, keahlian, sertifikat, blog, dan kontak dalam satu halaman yang modern, responsif, dan mendukung mode terang/gelap.

---

## 🧩 Tech Stack

| Teknologi        | Deskripsi                         |
| ---------------- | --------------------------------- |
| Vite + React     | Framework utama SPA               |
| Tailwind CSS     | Utility-first styling             |
| React Icons      | Ikon visual di navbar & footer    |
| Swiper.js        | Carousel sertifikat               |
| React State      | Mengatur modal, tema              |
| Dark Mode Toggle | Switch siang/malam via `theme.js` |

---

## 🗂️ Folder Structure

```plaintext
├── public/
│   └── favicon, images, dll
├── src/
│   ├── assets/                # Gambar, ikon tambahan
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Blog.jsx
│   │   ├── Sertifikat.jsx
│   │   ├── Contact.jsx
│   ├── theme.js               # File pengatur mode terang/gelap
│   ├── App.jsx                # Root App
│   └── main.jsx               # Entry point React
└── vite.config.js
```

---

## 🚀 Setup & Installasi

```bash
# 1. Clone repository
git clone https://github.com/username/portfolio.git

# 2. Masuk ke folder proyek
cd portfolio

# 3. Install dependencies
npm install

# 4. Jalankan local server
npm run dev
```

---

## 🌗 Mode Gelap / Terang

Dikontrol melalui `theme.js`. Tombol di navbar bisa mengubah tampilan antara **light** dan **dark**.
Tailwind otomatis membaca preferensi pengguna.

```js
// theme.js
const toggleTheme = () => {
  document.documentElement.classList.toggle("dark");
};
```

---

## 📄 Halaman-Halaman

| Halaman    | Deskripsi                                                               |
| ---------- | ----------------------------------------------------------------------- |
| Home       | Landing page interaktif dengan informasi umum                           |
| About      | Penjelasan latar belakang, bio singkat, dan nilai personal              |
| Skills     | Daftar skill frontend/backend + skill mengajar, bisa klik pop-up detail |
| Sertifikat | Carousel sertifikat dengan modal detail + efek blur                     |
| Blog       | Placeholder artikel atau tulisan                                        |
| Contact    | Form atau informasi kontak + sosial media                               |

---

## 💡 Komponen Unggulan

### ✅ Skills Pop-up

* Setiap skill bisa diklik → muncul pop-up detail
* Latar belakang blur (bukan gelap)
* Informasi lengkap + tanggal pembelajaran
* Ada **tag acak** per skill
* Label “Baru” untuk pengalaman < 1 tahun

### ✅ Sertifikat Carousel

* Menggunakan **Swiper.js**
* Responsive di semua ukuran layar
* Modal detail dengan efek estetik

### ✅ Theme Toggle

* Tombol di Navbar (🌞/🌙)
* Menggunakan `document.documentElement.classList` dan Tailwind `dark:` utilities

---

## 📱 Responsivitas

✔️ Mobile
✔️ Tablet
✔️ Desktop
✔️ Retina-ready
✔️ UI ringan dan optimal

---

## 🛠️ Development Tips

* Tambahkan favicon dan meta tag SEO di `index.html`.
* Ganti placeholder gambar dengan gambar asli.
* Gunakan `lazy loading` untuk gambar besar.
* Pertimbangkan integrasi ke Netlify / Vercel untuk deployment.

---

## 🧾 Lisensi

Proyek ini bersifat open-source (MIT License). Bebas digunakan dan dimodifikasi.

---

## 🙋‍♂️ Pengembang

**Nama:** (Masukkan Nama)
**Peran:** Fullstack Developer & Guru
**Kontak:** \[LinkedIn] | \[Email] | \[Instagram]

---


