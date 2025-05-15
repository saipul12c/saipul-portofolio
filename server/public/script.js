async function api(path, method = 'GET', data) {
  const opts = { method, credentials: 'include' };
  if (data) {
    opts.headers = { 'Content-Type': 'application/json' };
    opts.body = JSON.stringify(data);
  }
  const res = await fetch(`/api${path}`, opts);
  return res.json();
}

async function loadPosts() {
  const posts = await api('/posts');
  const container = document.getElementById('posts');
  container.innerHTML = '';
  posts.forEach(p => {
    const el = document.createElement('div');
    el.className = 'post';
    el.innerHTML = `
      <h3>${p.title}</h3>
      <small>by ${p.author} at ${new Date(p.createdAt).toLocaleString()}</small>
      <p>${p.content}</p>
    `;
    container.appendChild(el);
  });
}

async function checkSession() {
  // coba panggil posts untuk tahu status login
  const res = await api('/posts');
  const logoutBtn = document.getElementById('logoutBtn');
  if (res.error === 'Harus login terlebih dahulu') {
    logoutBtn.style.display = 'none';
    document.getElementById('new-post-section')?.style.display = 'none';
  } else {
    logoutBtn.style.display = 'inline';
    document.getElementById('new-post-section')?.style.display = 'block';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('posts')) {
    loadPosts();
    checkSession();
    document.getElementById('logoutBtn').onclick = async () => {
      await api('/auth/logout', 'POST');
      window.location.reload();
    };
    document.getElementById('postForm')?.addEventListener('submit', async e => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      await api('/posts', 'POST', { title, content });
      document.getElementById('title').value = '';
      document.getElementById('content').value = '';
      loadPosts();
    });
  }

  if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async e => {
      e.preventDefault();
      const u = document.getElementById('username').value;
      const p = document.getElementById('password').value;
      const res = await api('/auth/login', 'POST', { username: u, password: p });
      if (res.error) return alert(res.error);
      window.location = '/';
    });
  }

  if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async e => {
      e.preventDefault();
      const u = document.getElementById('username').value;
      const p = document.getElementById('password').value;
      const res = await api('/auth/register', 'POST', { username: u, password: p });
      if (res.error) return alert(res.error);
      window.location = '/';
    });
  }
});
