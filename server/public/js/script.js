// script.js (login & registrasi)

async function api(path, method = 'GET', data) {
  const opts = { method, credentials: 'include' };
  if (data) {
    opts.headers = { 'Content-Type': 'application/json' };
    opts.body = JSON.stringify(data);
  }
  const res = await fetch(`/api${path}`, opts);
  return res.json();
}

// Utility to handle API responses (errors & validation)
function handleApiErrors(res) {
  if (res.error) {
    alert(res.error);
    return true;
  }
  if (res.errors && Array.isArray(res.errors)) {
    const msgs = res.errors.map(e => e.msg || e.msg).join("\n");
    alert(msgs);
    return true;
  }
  return false;
}

window.addEventListener('DOMContentLoaded', () => {
  // LOGIN
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      // (opsional) bisa tambahkan validasi di sini
      const res = await api('/auth/login', 'POST', { username, password });
      if (handleApiErrors(res)) return;
      // setelah berhasil login, redirect ke dashboard
      window.location.href = '/dashboard';
    });
  }

  // REGISTRASI
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async e => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      // validasi konfirmasi password di client
      if (password !== confirmPassword) {
        alert('Password dan konfirmasi password tidak cocok.');
        return;
      }

      const res = await api('/auth/register', 'POST', { username, email, password, confirmPassword });
      if (handleApiErrors(res)) return;
      // setelah berhasil registrasi, redirect ke dashboard
      window.location.href = '/login';
    });
  }
});
