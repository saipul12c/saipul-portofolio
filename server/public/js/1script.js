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

window.addEventListener('DOMContentLoaded', () => {
  // LOGIN
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const u = document.getElementById('username').value.trim();
      const p = document.getElementById('password').value;
      // (opsional) bisa tambahkan validasi di sini
      const res = await api('/auth/login', 'POST', { username: u, password: p });
      if (res.error) {
        alert(res.error);
        return;
      }
      // setelah berhasil login, redirect ke dashboard
      window.location.href = '/dashboard';
    });
  }

  // REGISTRASI
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async e => {
      e.preventDefault();
      const u = document.getElementById('username').value.trim();
      const p = document.getElementById('password').value;
      const cpw = document.getElementById('confirmPassword').value;
      // validasi konfirmasi password
      if (p !== cpw) {
        alert('Password dan konfirmasi password tidak cocok.');
        return;
      }
      const res = await api('/auth/register', 'POST', { username: u, password: p });
      if (res.error) {
        alert(res.error);
        return;
      }
      // setelah berhasil registrasi, redirect ke dashboard
      window.location.href = '/dashboard';
    });
  }
});
