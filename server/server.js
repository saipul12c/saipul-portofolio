require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

const app = express();

// === Security & Logging Middleware ===
app.use(helmet());
app.use(morgan('combined'));

// === CORS ===
// Allow only your front-end origin to include credentials
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:8080';
app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  credentials: true
}));

// === Body parsers ===
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// === Session management ===
app.use(session({
  secret: process.env.SESSION_SECRET || 'ganti_dengan_secret_yang_rumit',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 jam
    httpOnly: true,
    sameSite: 'lax',        // mitigate CSRF
    // secure: true         // uncomment jika HTTPS
  }
}));

// === Static files ===
// Semua file HTML/CSS/JS/asset di public/
app.use(express.static(path.join(__dirname, 'public')));

// === Frontend Routes ===
// Auth pages
app.get(['/', '/login'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});
app.get('/dashboard', (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Blog/News pages
app.get('/posts', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'posts.html'));
});
app.get('/posts/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'post-detail.html'));
});

// === API Routes ===
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

// Fallback 404 for API
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Endpoint API tidak ditemukan' });
});

// Fallback 404 for everything else (client-side router support)
app.use((req, res) => {
  // If the request accepts HTML, serve your SPA entrypoint
  if (req.accepts('html')) {
    return res.sendFile(path.join(__dirname, 'public', '404.html'));
  }
  // Otherwise default to plain text
  res.status(404).type('txt').send('404 - Not Found');
});

// === Error Handler ===
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// === Start Server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
