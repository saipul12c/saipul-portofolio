// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  // Toggle mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  toggle.addEventListener('click', () => nav.classList.toggle('open'));

  // Fetch dan render posts
  const postsContainer = document.getElementById('posts-container');
  const errorMsg = document.getElementById('posts-error');

  fetch('/api/posts')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not OK');
      return response.json();
    })
    .then(posts => {
      if (!Array.isArray(posts) || posts.length === 0) {
        postsContainer.innerHTML = '<p>Tidak ada artikel untuk ditampilkan.</p>';
        return;
      }
      // Buat elemen card untuk tiap post
      postsContainer.innerHTML = posts.map(post => `
        <article class="post-card">
          <img src="${post.thumbnailUrl || 'images/default-thumb.jpg'}" alt="${post.title}" class="post-thumb"/>
          <h3 class="post-title">${post.title}</h3>
          <p class="post-excerpt">${post.excerpt}</p>
          <a href="articles.html?id=${post.id}" class="btn-outline btn-sm">Baca Selengkapnya</a>
        </article>
      `).join('');
    })
    .catch(err => {
      console.error('Fetch error:', err);
      errorMsg.hidden = false;
    });
});
