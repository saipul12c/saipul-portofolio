// public/js/index.js

// ——— Helper API ———
async function api(path, method = 'GET', data) {
  const opts = { method, credentials: 'include' };
  if (data) {
    opts.headers = { 'Content-Type': 'application/json' };
    opts.body = JSON.stringify(data);
  }
  const res = await fetch(`/api${path}`, opts);
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = json?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return json;
}

function handleApiErrors(res) {
  if (!res) return true;
  if (res.error) {
    alert(res.error);
    return true;
  }
  if (res.errors && Array.isArray(res.errors)) {
    const msgs = res.errors.map(e => e.msg).join("\n");
    alert(msgs);
    return true;
  }
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  // ——— Mobile nav toggle ———
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.site-nav');
  toggle?.addEventListener('click', () => nav.classList.toggle('open'));

  // ——— Selectors ———
  const postsContainer = document.getElementById('posts-container');
  const errorMsg       = document.getElementById('posts-error');
  const searchForm     = document.getElementById('search-form');
  const searchInput    = document.getElementById('search-input');

  // ——— HTML Escaping ———
  function escapeHTML(str = '') {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;',
      '"': '&quot;', "'": '&#39;'
    })[m]);
  }

  // ——— Load & Render Posts ———
  async function loadPosts(searchTerm = '') {
    errorMsg.hidden = true;
    postsContainer.innerHTML = '<p>Memuat...</p>';

    try {
      // build path: with or without search
      let path = '/posts';
      if (searchTerm) {
        path += `?search=${encodeURIComponent(searchTerm)}`;
      }

      const res = await api(path);
      if (handleApiErrors(res)) return;

      // respons bisa { data: [...] } atau langsung [...]
      const posts = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res)
          ? res
          : [];

      if (posts.length === 0) {
        postsContainer.innerHTML = '<p>Tidak ada artikel yang sesuai.</p>';
        return;
      }

      postsContainer.innerHTML = posts.map(post => {
        const imgSrc = post.featuredImage || '/images/default-thumb.jpg';
        const dateObj = new Date(post.publishAt || post.createdAt);
        const dateStr = dateObj.toLocaleDateString('id-ID', {
          year: 'numeric', month: 'long', day: 'numeric'
        });
        return `
          <article class="post-card">
            <img src="${escapeHTML(imgSrc)}"
                 alt="${escapeHTML(post.title)}"
                 class="post-thumb" />
            <div class="post-content">
              <h3 class="post-title">${escapeHTML(post.title)}</h3>
              <p class="post-meta">Dipublikasikan pada ${dateStr}</p>
              <p class="post-excerpt">${escapeHTML(post.summary || post.content.substring(0, 200))}${(post.summary || post.content).length > 200 ? '…' : ''}</p>
              <a href="/posts/${encodeURIComponent(post.slug)}"
                 class="btn-outline btn-sm">
                Baca Selengkapnya
              </a>
            </div>
          </article>
        `;
      }).join('');
    } catch (err) {
      console.error('Fetch posts error:', err);
      errorMsg.textContent = err.message || 'Gagal memuat artikel.';
      errorMsg.hidden = false;
      postsContainer.innerHTML = '';
    }
  }

  // ——— Search Form ———
  searchForm?.addEventListener('submit', e => {
    e.preventDefault();
    loadPosts(searchInput.value.trim());
  });

  // ——— Initial load ———
  loadPosts();
});
