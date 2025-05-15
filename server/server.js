const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

const app = express();

// === Middleware ===

// CORS: jika Anda benar‑benar perlu digunakan dari origin lain, 
// ganti origin:'*' dengan domain front-end Anda dan enable credentials.
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  credentials: true
}));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session management
app.use(session({
  secret: 'ganti_dengan_secret_yang_rumit',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 jam
    httpOnly: true,
    sameSite: 'lax'        // mitigate CSRF
    // secure: true         // uncomment jika HTTPS
  }
}));

// === Static files ===
// Semua file HTML/CSS/JS/asset di public/
app.use(express.static(path.join(__dirname, 'public')));

// === Frontend routes ===
// Akses root "/" → login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Akses "/login" → login.html
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Akses "/register" → register.html
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Dashboard, hanya untuk user yang sudah login
app.get('/dashboard', (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// === API routes ===
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

// Fallback 404 untuk API
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Endpoint API tidak ditemukan' });
});


// Fallback 404 untuk halaman
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// === Start server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
