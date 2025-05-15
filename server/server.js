const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

const app = express();

// Middleware CORS (izinkan akses dari luar, misalnya front-end Vite/React)
app.use(cors({
  origin: '*', // ganti dengan origin tertentu jika perlu, misal: 'http://localhost:5173'
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session management
app.use(session({
  secret: 'ganti_dengan_secret_yang_rumit', // ganti dengan string acak yang kuat di production
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 jam
}));

// Static files (frontend HTML, CSS, JS)
app.use('/', express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
