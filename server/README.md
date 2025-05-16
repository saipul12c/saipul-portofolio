**🚀 MySite CMS - Portfolio & News Platform**

**Deskripsi Proyek**
MySite CMS adalah aplikasi web portofolio dan platform blog/news berbasis Node.js & Express, dirancang untuk kreator konten yang menginginkan sistem sederhana namun kaya fitur.

Pengguna dapat:

* Mendaftarkan akun dan login melalui sesi aman.
* Membuat, mengedit, dan menjadwalkan posting (blog & news) dengan tag, kategori, dan featured image.
* Melihat daftar post, detail, archive, tag cloud, dan feed (RSS/Sitemap).
* Mengelola trash (soft delete) dengan opsi restore.
* Membookmark artikel favorit dan meninggalkan komentar.

**Mengapa Proyek Ini Diciptakan?**
Banyak kreator membutuhkan CMS yang mudah dipelajari tanpa setup database rumit. MySite CMS hadir sebagai solusi file-based:

* **Kemudahan Instalasi**: Cukup clone dan jalankan, tanpa konfigurasi DB eksternal.
* **Pengetahuan Praktis**: Belajar Express best-practices (middleware, router modular, session).
* **Fitur Lengkap**: CRUD, scheduling, RSS, sitemap, statistik, dan UI minimalis.

**Tujuan & Manfaat**

1. **Pembelajaran**: Paham arsitektur modular Express dan pengelolaan file JSON.
2. **Cepat & Ringan**: Cocok untuk prototipe blog/portfolio tanpa hosting DB.
3. **Extendable**: Modular handler memudahkan pindah ke database SQL/NoSQL.

---

## 📦 Instalasi & Menjalankan

1. Clone repo:

```bash
git clone https://github.com/namaanda/mysite-cms.git
cd mysite-cms
```

2. Install dependencies:

```bash
npm install
```

3. Siapkan folder data:

```bash
mkdir data
echo "[]" > data/posts.json
echo "[]" > data/users.json
```

4. Tambahkan variabel lingkungan di `.env`:

```
PORT=3000
SESSION_SECRET=ubah_500karakter
FRONTEND_ORIGIN=http://localhost:8080
```

5. Jalankan server:

```bash
node server.js
```

Akses di `http://localhost:3000`.

---

## 🧩 Struktur Proyek

```
my-app/
├─ data/                 # file JSON (posts.json, users.json)
├─ public/
│  ├─ css/
│  │  ├─ dashboard.css
│  │  └─ home.css
│  ├─ js/
│  │  ├─ dashboard.js
│  │  └─ index.js
│  └─ *.html            # login.html, register.html, dashboard.html, posts.html, post-detail.html
├─ routes/
│  ├─ auth.js           # register, login, logout
│  └─ posts.js          # router utama posts API
├─ routes/handlers/
│  ├─ postsList.js      # list, detail, related, stats, RSS & sitemap
│  ├─ postsCrud.js      # create, update, delete, restore, user posts/trash
│  ├─ bookmarks.js      # bookmark management
│  └─ comments.js       # comment CRUD
├─ server.js            # setup Express, middleware, static & API routes
└─ .env
```

**Modularisasi**: Router `routes/posts.js` mendelegasikan setiap endpoint ke handler masing-masing di `routes/handlers/`, memudahkan maintenance.

---

## 🚀 Fitur Utama

* **Autentikasi & Session**: Register, Login, Logout dengan hashing & express-session.
* **CRUD Post**: Title, content, summary auto-generate, slug, categories, tags, featured image, source (news), status (draft/published), schedule.
* **Soft Delete & Restore**: Post tidak langsung hilang, bisa dikembalikan.
* **Bookmark**: Tandai dan kelola artikel favorit.
* **Komentar**: Tambah/edit/hapus komentar dengan pagination.
* **Related & Statistics**: Related posts, popular, tag cloud, archive, overview stats.
* **RSS & Sitemap**: Otomatis generate feed dan sitemap XML.
* **Client UI**: Vanilla HTML/CSS/JS, responsive, light/dark theme toggle.

---

## 🛠 API Endpoints

| Method | Endpoint                                | Deskripsi                               |
| ------ | --------------------------------------- | --------------------------------------- |
| POST   | `/api/auth/register`                    | Daftar user baru                        |
| POST   | `/api/auth/login`                       | Login & buat session                    |
| POST   | `/api/auth/logout`                      | Logout, hapus session                   |
| GET    | `/api/posts`                            | Daftar & search publik                  |
| GET    | `/api/posts/:slug`                      | Detail post by slug (increment views)   |
| POST   | `/api/posts`                            | Buat post baru                          |
| PUT    | `/api/posts/:id`                        | Edit post                               |
| DELETE | `/api/posts/:id`                        | Soft-delete post                        |
| POST   | `/api/posts/:id/restore`                | Restore from trash                      |
| GET    | `/api/posts/user/mine/all`              | Semua post user (all status)            |
| GET    | `/api/posts/user/trash`                 | Lihat trash user                        |
| POST   | `/api/posts/:id/bookmark`               | Tambah bookmark                         |
| DELETE | `/api/posts/:id/bookmark`               | Hapus bookmark                          |
| GET    | `/api/posts/user/bookmarks`             | Daftar post yang dibookmark             |
| POST   | `/api/posts/:id/comment`                | Tambah komentar                         |
| GET    | `/api/posts/:id/comments`               | Daftar komentar dengan pagination       |
| PUT    | `/api/posts/:postId/comment/:commentId` | Edit komentar                           |
| DELETE | `/api/posts/:postId/comment/:commentId` | Hapus komentar                          |
| GET    | `/api/posts/:id/related`                | Related posts otomatis                  |
| GET    | `/api/posts/stats/tag-cloud`            | Tag cloud counts                        |
| GET    | `/api/posts/stats/archive`              | Archive by month                        |
| GET    | `/api/posts/stats/popular`              | Top N popular posts                     |
| GET    | `/api/posts/stats/overview`             | Overview stats (posts, comments, likes) |
| GET    | `/api/posts/feed/rss`                   | RSS feed terbaru                        |
| GET    | `/api/posts/sitemap.xml`                | Sitemap XML                             |

---

## 💡 Tips Pengembangan

* **Database**: Ganti file JSON ke MongoDB/PostgreSQL untuk skala besar.
* **Security**: Tambahkan CSRF, rate-limit, HTTPS + secure cookies.
* **Testing**: Buat unit test untuk handler dan API.
* **Arsitektur**: Pisahkan lagi ke service/controller, gunakan TypeScript.

---

## 🤝 Kontribusi & Lisensi

Proyek ini open-source di bawah MIT License. Semua kontribusi (issues/PR) sangat dihargai!

**Contact**: Nama Anda • [email@example.com](mailto:email@example.com) • [GitHub/namaanda](https://github.com/namaanda)
