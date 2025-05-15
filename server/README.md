📁 File: DOCUMENTATION.md

🚀 Auth App – Dokumentasi Penggunaan & Pengembangan

Deskripsi Proyek
Sistem autentikasi pengguna berbasis Node.js dengan Express. Proyek ini menyediakan halaman login, registrasi, dan dashboard menggunakan HTML/CSS/JS murni (tanpa canvas) serta API berbasis REST untuk autentikasi, penyimpanan data pengguna lokal (dalam file JSON), dan manajemen sesi.

🗂 Struktur Proyek

├── public/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── 404.html
│   ├── login.css
│   ├── styles.css
│   └── script.js
├── routes/
│   ├── auth.js
│   └── posts.js
├── data/
│   └── users.json (otomatis dibuat)
├── server.js
└── package.json

🔧 Instalasi & Menjalankan Server

1. Clone repository ini

```bash
git clone https://github.com/namaanda/auth-app.git
cd auth-app
```

2. Instal dependensi

```bash
npm install
```

3. Jalankan server

```bash
node server.js
```

Server akan berjalan di [http://localhost:3000](http://localhost:3000)

🧠 Teknologi yang Digunakan

* Node.js & Express
* express-session
* bcryptjs (untuk hashing password)
* body-parser & cors
* HTML, CSS (tanpa framework), dan vanilla JS

📘 Fitur Utama

✅ Registrasi

* Validasi username dan password
* Konfirmasi password di sisi client
* Hashing password sebelum disimpan
* Cek username agar tidak duplikat
* Simpan data user ke users.json

✅ Login

* Validasi kredensial terhadap data user
* Penggunaan sesi (session) untuk autentikasi
* Redirect ke dashboard jika berhasil login

✅ Dashboard

* Hanya bisa diakses jika sudah login
* Proteksi sisi server dengan pengecekan session

✅ Logout

* Menghapus session dan cookie
* Endpoint /api/auth/logout

🛠 API Endpoint

| Method | Endpoint           | Fungsi                    |
| ------ | ------------------ | ------------------------- |
| POST   | /api/auth/register | Mendaftarkan user baru    |
| POST   | /api/auth/login    | Melakukan login           |
| POST   | /api/auth/logout   | Logout dari sesi saat ini |

Contoh Body JSON:

```json
{
  "username": "admin",
  "password": "123456"
}
```

📁 File Penting

* public/script.js
  Menangani semua logika frontend: event submit form login & registrasi, validasi, pemanggilan API.

* routes/auth.js
  Rute backend untuk login, registrasi, dan logout. Menggunakan bcryptjs dan express-session.

* server.js
  Setup server utama, middleware, konfigurasi CORS, session, dan route frontend/backend.

🧩 Tips untuk Pengembangan Lanjut

* Ganti penyimpanan users.json dengan database seperti MongoDB atau PostgreSQL.
* Tambahkan verifikasi email saat registrasi.
* Tambahkan CSRF protection dan rate limiting.
* Gunakan HTTPS untuk produksi dan set secure cookie.
* Pisahkan kode ke dalam controller/services untuk arsitektur yang lebih scalable.

🎨 Desain & UX

* Tampilan minimalis dan responsif.
* Validasi pengguna ditampilkan dalam bentuk alert.
* User flow: Login → Dashboard, Register → Dashboard, Logout → Login

🔐 Keamanan

* Password tidak disimpan dalam bentuk plaintext.
* Session cookie dilindungi dengan httpOnly dan sameSite.
* Middleware validasi mencegah akses tidak sah ke dashboard.

🤝 Lisensi

MIT License – Bebas digunakan, modifikasi, dan distribusikan.

📬 Kontak

Jika Anda memiliki pertanyaan atau ingin berkontribusi:

Nama: Nama Anda
Email: [email@example.com](mailto:email@example.com)
GitHub: [https://github.com/namaanda](https://github.com/namaanda)

—

