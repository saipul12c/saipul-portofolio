// main.js

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
  // Jika halaman posts ada
  if (document.getElementById('posts')) {
    loadPosts();
    checkSession();

    // LOGOUT
    document.getElementById('logoutBtn').onclick = async () => {
      await api('/auth/logout', 'POST');
      window.location.reload();
    };

    // FORM POST BARU
    const postForm = document.getElementById('postForm');
    if (postForm) {
      postForm.addEventListener('submit', async e => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        await api('/posts', 'POST', { title, content });
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        loadPosts();
      });
    }
  }
});
