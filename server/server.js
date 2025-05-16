require('dotenv').config();
const express       = require('express');
const session       = require('express-session');
const cookieParser  = require('cookie-parser');
const path          = require('path');
const cors          = require('cors');
const helmet        = require('helmet');
const morgan        = require('morgan');

// Routers
const authRouter  = require('./routes/auth');
const postsRouter = require('./routes/posts');

const app = express();

// === Security & Logging Middleware ===
app.use(helmet());
app.use(morgan('combined'));

// === Cookie Parser (optional, for read other cookies) ===
app.use(cookieParser());

// === CORS ===
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:8080';
app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  credentials: true
}));

// === Body parsers ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Session management (express-session) ===
app.use(session({
  name: 'sid',                         // Nama cookie session
  secret: process.env.SESSION_SECRET || 'ganti_dengan_secret_yang_rumit',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,            // 1 jam
    httpOnly: true,
    sameSite: 'lax',
    // secure: true,                   // Aktifkan jika pakai HTTPS
  }
}));

// === Static files ===
app.use(express.static(path.join(__dirname, 'public')));

// === Auth-check Middleware ===
function requireLogin(req, res, next) {
  if (!req.session.username) {
    // Belum login → redirect ke login
    return res.redirect('/login');
  }
  next();
}

// === Frontend Routes ===
// Auth pages
app.get(['/', '/login'], (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/register', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Dashboard: hanya bisa diakses jika sudah login
app.get('/dashboard', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Blog/News pages (buka untuk semua)
app.get('/posts', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'posts.html'));
});
app.get('/posts/:slug', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'post-detail.html'));
});

// === API Routes ===
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

// Fallback 404 untuk API
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Endpoint API tidak ditemukan' });
});

// Fallback 404 untuk halaman lain (SPA support)
app.use((req, res) => {
  if (req.accepts('html')) {
    return res.sendFile(path.join(__dirname, 'public', 'error', '404.html'));
  }
  res.status(404).type('txt').send('404 - Not Found');
});

// === Error Handler ===
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// === Start Server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
