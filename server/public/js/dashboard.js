// public/js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
  // Form elements
  const postForm          = document.getElementById('postForm');
  const titleInput        = document.getElementById('title');
  const contentInput      = document.getElementById('content');
  const typeSelect        = document.getElementById('type');
  const categoriesInput   = document.getElementById('categories');
  const tagsInput         = document.getElementById('tags');
  const featuredImageInput= document.getElementById('featuredImage');
  const statusSelect      = document.getElementById('status');
  const publishAtInput    = document.getElementById('publishAt');
  const formError         = document.getElementById('form-error');

  // Posts list elements
  const postsContainer    = document.getElementById('posts-container');
  const postsError        = document.getElementById('posts-error');
  const reloadBtn         = document.getElementById('reloadPosts');

  // Logout
  const logoutBtn         = document.getElementById('logoutBtn');

  // Fetch user's posts (all statuses, including drafts, scheduled, deleted)
  async function fetchPosts() {
    postsError.hidden = true;
    try {
      const res = await fetch('/api/posts/user/mine/all', { credentials: 'include' });
      if (!res.ok) throw new Error('Network response was not OK');
      const posts = await res.json();
      renderPosts(posts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      postsError.hidden = false;
    }
  }

  function renderPosts(posts) {
    if (!Array.isArray(posts) || posts.length === 0) {
      postsContainer.innerHTML = '<p>Belum ada post.</p>';
      return;
    }
    postsContainer.innerHTML = posts.map(post => {
      const isDeleted = post.isDeleted;
      const badge = isDeleted
        ? `<span class="badge deleted">Trashed</span>`
        : `<span class="badge">${post.status}${post.publishAt ? ' @ '+ new Date(post.publishAt).toLocaleString() : ''}</span>`;
      const cats = (post.categories||[]).join(', ');
      const tags = (post.tags||[]).join(', ');
      return `
        <div class="post-item" data-id="${post.id}">
          <h3>${post.title}</h3>
          <div class="meta">
            ${badge}
            <small>Views: ${post.views||0}, Likes: ${post.likes?.length||0}</small>
          </div>
          <p>${post.summary || post.content.substring(0,200)}${(post.summary||post.content).length > 200 ? '…' : ''}</p>
          <div class="labels">
            ${cats ? `<small>Categories: ${cats}</small>` : ''}
            ${tags ? `<small>Tags: ${tags}</small>` : ''}
          </div>
          <div class="actions">
            ${isDeleted
              ? `<button class="btn-sm restore">Restore</button>`
              : `<button class="btn-sm edit">Edit</button>
                 <button class="btn-sm delete">Hapus</button>`}
          </div>
        </div>
      `;
    }).join('');

    // Attach handlers
    document.querySelectorAll('.post-item').forEach(item => {
      const id = item.dataset.id;
      if (item.querySelector('.delete')) {
        item.querySelector('.delete').addEventListener('click', () => deletePost(id));
        item.querySelector('.edit').addEventListener('click', () => editPost(item, id));
      } else if (item.querySelector('.restore')) {
        item.querySelector('.restore').addEventListener('click', () => restorePost(id));
      }
    });
  }

  // Create new post
  postForm.addEventListener('submit', async e => {
    e.preventDefault();
    formError.hidden = true;
    const payload = {
      title: titleInput.value.trim(),
      content: contentInput.value.trim(),
      type: typeSelect.value,
      categories: categoriesInput.value ? categoriesInput.value.split(',').map(s => s.trim()) : [],
      tags: tagsInput.value ? tagsInput.value.split(',').map(s => s.trim()) : [],
      featuredImage: featuredImageInput.value.trim() || undefined,
      status: statusSelect.value,
      publishAt: publishAtInput.value ? new Date(publishAtInput.value).toISOString() : undefined
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

  // Delete (soft-delete) post
  async function deletePost(id) {
    if (!confirm('Yakin ingin memindahkan post ke trash?')) return;
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

  // Restore trashed post
  async function restorePost(id) {
    try {
      const res = await fetch(`/api/posts/${id}/restore`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Gagal restore post');
      await fetchPosts();
    } catch (err) {
      console.error('Error restoring post:', err);
      alert('Gagal memulihkan post');
    }
  }

  // Inline edit
  function editPost(item, id) {
    const post = {}; // we'll capture existing values
    const h3 = item.querySelector('h3');
    const p  = item.querySelector('p');
    post.title   = h3.textContent;
    post.content = p.textContent;

    h3.innerHTML = `<input type="text" value="${post.title}" class="edit-title">`;
    p.innerHTML  = `<textarea class="edit-content">${post.content}</textarea>`;
    item.querySelector('.actions').innerHTML = `
      <button class="btn-sm save">Simpan</button>
      <button class="btn-sm cancel">Batal</button>
    `;
    item.querySelector('.cancel').addEventListener('click', fetchPosts);
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

  // Reload on error
  reloadBtn?.addEventListener('click', fetchPosts);

  // Logout
  logoutBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        window.location.href = '/login';
      } else {
        throw new Error('Gagal logout');
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('Gagal logout, silakan coba lagi.');
    }
  });

  // Init
  fetchPosts();
});
