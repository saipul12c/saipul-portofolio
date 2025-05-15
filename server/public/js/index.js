// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  // Toggle mobile navigation
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Fetch dan render artikel/posts
  const postsContainer = document.getElementById('posts-container');
  const errorMsg = document.getElementById('posts-error');

  async function loadPosts() {
    errorMsg.hidden = true;
    try {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('Gagal fetch data');

      const posts = await res.json();
      const activePosts = posts.filter(post => post.status === 'published');

      if (!Array.isArray(activePosts) || activePosts.length === 0) {
        postsContainer.innerHTML = '<p>Tidak ada artikel yang tersedia saat ini.</p>';
        return;
      }

      postsContainer.innerHTML = activePosts.map(post => {
        const imgSrc = post.thumbnailUrl || 'images/default-thumb.jpg';
        const createdAt = new Date(post.createdAt).toLocaleDateString('id-ID', {
          year: 'numeric', month: 'long', day: 'numeric'
        });
        return `
          <article class="post-card">
            <img src="${imgSrc}" alt="${post.title}" class="post-thumb" />
            <div class="post-content">
              <h3 class="post-title">${post.title}</h3>
              <p class="post-meta">Dipublikasikan pada ${createdAt}</p>
              <p class="post-excerpt">${post.excerpt}</p>
              <a href="articles.html?id=${post.id}" class="btn-outline btn-sm">Baca Selengkapnya</a>
            </div>
          </article>
        `;
      }).join('');
    } catch (err) {
      console.error('Fetch error:', err);
      errorMsg.hidden = false;
    }
  }

  loadPosts();
});
