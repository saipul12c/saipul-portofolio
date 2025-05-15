// js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
  const postForm     = document.getElementById('postForm');
  const titleInput   = document.getElementById('title');
  const contentInput = document.getElementById('content');
  const formError    = document.getElementById('form-error');

  const postsContainer = document.getElementById('posts-container');
  const postsError     = document.getElementById('posts-error');
  const reloadBtn      = document.getElementById('reloadPosts');

  const logoutBtn = document.getElementById('logoutBtn');

  // Fungsi fetch semua posts
  async function fetchPosts() {
    postsError.hidden = true;
    try {
      const res = await fetch('/api/posts', { credentials: 'include' });
      if (!res.ok) throw new Error('Network response was not OK');
      const posts = await res.json();
      renderPosts(posts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      postsError.hidden = false;
    }
  }

  // Render daftar posts
  function renderPosts(posts) {
    if (!Array.isArray(posts) || posts.length === 0) {
      postsContainer.innerHTML = '<p>Belum ada post.</p>';
      return;
    }
    postsContainer.innerHTML = posts.map(post => `
      <div class="post-item" data-id="${post.id}">
        <h3>${post.title}</h3>
        <p>${post.content.substring(0, 200)}${post.content.length > 200 ? '…' : ''}</p>
        <small>Dibuat: ${new Date(post.createdAt).toLocaleString()}</small>
        <div class="actions">
          <button class="btn-sm edit">Edit</button>
          <button class="btn-sm delete">Hapus</button>
        </div>
      </div>
    `).join('');

    // Pasang event handler untuk Edit & Delete
    document.querySelectorAll('.post-item').forEach(item => {
      const id = item.dataset.id;
      item.querySelector('.delete').addEventListener('click', () => deletePost(id));
      item.querySelector('.edit').addEventListener('click', () => editPost(item, id));
    });
  }

  // Buat post baru
  postForm.addEventListener('submit', async e => {
    e.preventDefault();
    formError.hidden = true;
    const payload = {
      title: titleInput.value.trim(),
      content: contentInput.value.trim()
    };
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Gagal membuat post');
      postForm.reset();
      await fetchPosts();
    } catch (err) {
      console.error('Error creating post:', err);
      formError.hidden = false;
    }
  });

  // Hapus post
  async function deletePost(id) {
    if (!confirm('Yakin ingin menghapus post ini?')) return;
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Gagal menghapus post');
      await fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Gagal menghapus post');
    }
  }

  // Edit post (inline)
  function editPost(item, id) {
    const titleEl   = item.querySelector('h3');
    const contentEl = item.querySelector('p');
    const oldTitle   = titleEl.textContent;
    const oldContent = contentEl.textContent;

    titleEl.innerHTML = `<input type="text" value="${oldTitle}" class="edit-title">`;
    contentEl.innerHTML = `<textarea class="edit-content">${oldContent}</textarea>`;
    item.querySelector('.actions').innerHTML = `
      <button class="btn-sm save">Simpan</button>
      <button class="btn-sm cancel">Batal</button>
    `;

    item.querySelector('.cancel').addEventListener('click', () => fetchPosts());
    item.querySelector('.save').addEventListener('click', async () => {
      const newTitle   = item.querySelector('.edit-title').value.trim();
      const newContent = item.querySelector('.edit-content').value.trim();
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ title: newTitle, content: newContent })
        });
        if (!res.ok) throw new Error('Gagal memperbarui post');
        await fetchPosts();
      } catch (err) {
        console.error('Error updating post:', err);
        alert('Gagal menyimpan perubahan');
      }
    });
  }

  // Reload posts on tombol error
  reloadBtn?.addEventListener('click', fetchPosts);

  // Logout
  logoutBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        window.location.href = 'login.html';
      } else {
        throw new Error('Gagal logout');
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('Gagal logout, silakan coba lagi.');
    }
  });

  // Inisialisasi
  fetchPosts();
});
