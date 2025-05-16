// public/js/dashboard.js

// ——— Helper API & Error Handling ———
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
  // ——— Config & Selectors ———
  const API_BASE           = '/posts';
  const root               = document.documentElement;
  const themeToggle        = document.getElementById('themeToggle');
  const postForm           = document.getElementById('postForm');
  const titleInput         = document.getElementById('title');
  const contentInput       = document.getElementById('content');
  const typeSelect         = document.getElementById('type');
  const categoriesInput    = document.getElementById('categories');
  const tagsInput          = document.getElementById('tags');
  const featuredImageInput = document.getElementById('featuredImage');
  const statusSelect       = document.getElementById('status');
  const publishAtInput     = document.getElementById('publishAt');
  const formError          = document.getElementById('form-error');

  const postsContainer     = document.getElementById('posts-container');
  const postsError         = document.getElementById('posts-error');
  const reloadBtn          = document.getElementById('reloadPosts');
  const logoutBtn          = document.getElementById('logoutBtn');

  // ——— Profile & Modal Selectors ———
  const userProfileBtn     = document.getElementById('userProfileBtn');
  const avatarImg          = document.getElementById('avatarImg');
  const usernameDisplay    = document.getElementById('usernameDisplay');
  const profileModal       = document.getElementById('profileModal');
  const modalOverlay       = profileModal?.querySelector('.modal-overlay');
  const closeProfileModal  = document.getElementById('closeProfileModal');

  const modalAvatar        = document.getElementById('modalAvatar');
  const modalUsername      = document.getElementById('modalUsername');
  const modalName          = document.getElementById('modalName');
  const modalEmail         = document.getElementById('modalEmail');
  const modalBio           = document.getElementById('modalBio');
  const modalPhone         = document.getElementById('modalPhone');
  const modalAddress       = document.getElementById('modalAddress');
  const modalTwitter       = document.getElementById('modalTwitter');
  const modalLinkedin      = document.getElementById('modalLinkedin');
  const modalCreatedAt     = document.getElementById('modalCreatedAt');
  const modalUpdatedAt     = document.getElementById('modalUpdatedAt');

  // ——— Theme toggle ———
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'light';
    const next    = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    themeToggle.innerHTML = next === 'light'
      ? '<i class="fa fa-moon"></i>'
      : '<i class="fa fa-sun"></i>';
  });

  // ——— Modal open/close ———
  function openModal() {
    profileModal.hidden = false;
  }
  function closeModal() {
    profileModal.hidden = true;
  }
  userProfileBtn?.addEventListener('click', openModal);
  closeProfileModal?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);

  // ——— Fetch & Render Profile ———
  async function fetchProfile() {
    try {
      const res = await api('/auth/profile'); // GET /api/auth/profile
      if (handleApiErrors(res)) return;
      const {
        username, name, email, bio,
        phone, address, twitter, linkedin,
        avatarUrl, createdAt, updatedAt
      } = res.profile;

      // header display
      usernameDisplay.textContent = name || username;
      if (avatarUrl) avatarImg.src = avatarUrl;

      // modal display
      modalUsername.textContent  = username;
      modalName.textContent      = name || '-';
      modalEmail.textContent     = email || '-';
      modalBio.textContent       = bio || '-';
      modalPhone.textContent     = phone || '-';
      modalAddress.textContent   = address || '-';
      modalTwitter.textContent   = twitter || '-';
      modalLinkedin.textContent  = linkedin || '-';
      if (avatarUrl) modalAvatar.src = avatarUrl;
      // format dates
      modalCreatedAt.textContent = new Date(createdAt).toLocaleString();
      modalUpdatedAt.textContent = new Date(updatedAt).toLocaleString();
    } catch (err) {
      console.error('Fetch profile error:', err);
    }
  }

  // ——— Fetch & Render Posts ———
  async function fetchPosts() {
    postsError.hidden = true;
    try {
      const posts = await api(`${API_BASE}/user/mine/all`);
      renderPosts(posts);
    } catch (err) {
      console.error('Fetch posts error:', err);
      postsError.hidden = false;
    }
  }

  function renderPosts(posts) {
    if (!Array.isArray(posts) || posts.length === 0) {
      postsContainer.innerHTML = '<p>Belum ada post.</p>';
      return;
    }
    postsContainer.innerHTML = posts.map(p => {
      const isDeleted = p.isDeleted;
      const when = p.publishAt
        ? new Date(p.publishAt).toLocaleString()
        : '';
      const badge = isDeleted
        ? `<span class="badge deleted">Trashed</span>`
        : `<span class="badge">${p.status}${when ? ' @ ' + when : ''}</span>`;
      const cats = (p.categories || []).join(', ');
      const tags = (p.tags || []).join(', ');
      return `
        <div class="post-item" data-id="${p.id}">
          <h3>${escapeHTML(p.title)}</h3>
          <div class="meta">
            ${badge}
            <small>Views: ${p.views || 0}, Likes: ${p.likes?.length || 0}</small>
          </div>
          <p>${escapeHTML(p.summary || p.content.substring(0,200))}${(p.summary || p.content).length > 200 ? '…' : ''}</p>
          <div class="labels">
            ${cats ? `<small>Categories: ${escapeHTML(cats)}</small>` : ''}
            ${tags ? `<small>Tags: ${escapeHTML(tags)}</small>` : ''}
          </div>
          <div class="actions">
            ${isDeleted
              ? `<button class="btn-sm restore">Restore</button>`
              : `
                 <button class="btn-sm edit">Edit</button>
                 <button class="btn-sm delete">Hapus</button>
                 <button class="btn-sm bookmark">${p.bookmarked ? 'Unbookmark' : 'Bookmark'}</button>
               `}
          </div>
        </div>
      `;
    }).join('');

    // Attach handlers
    postsContainer.querySelectorAll('.post-item').forEach(item => {
      const id = item.dataset.id;
      item.querySelector('.delete')?.addEventListener('click', () => deletePost(id));
      item.querySelector('.edit')?.addEventListener('click', () => editPost(item, id));
      item.querySelector('.restore')?.addEventListener('click', () => restorePost(id));
      item.querySelector('.bookmark')?.addEventListener('click', () => toggleBookmark(item, id));
    });
  }

  function escapeHTML(str = '') {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;',
      '"': '&quot;', "'": '&#39;'
    })[m]);
  }

  // ——— Create Post ———
  postForm?.addEventListener('submit', async e => {
    e.preventDefault();
    formError.hidden = true;
    const payload = {
      title: titleInput.value.trim(),
      content: contentInput.value.trim(),
      type: typeSelect.value,
      categories: categoriesInput.value
        ? categoriesInput.value.split(',').map(s => s.trim())
        : [],
      tags: tagsInput.value
        ? tagsInput.value.split(',').map(s => s.trim())
        : [],
      featuredImage: featuredImageInput.value.trim() || undefined,
      status: statusSelect.value,
      publishAt: publishAtInput.value
        ? new Date(publishAtInput.value).toISOString()
        : undefined
    };
    try {
      const res = await api(API_BASE, 'POST', payload);
      if (handleApiErrors(res)) return;
      postForm.reset();
      await fetchPosts();
    } catch (err) {
      console.error('Create post error:', err);
      formError.hidden = false;
    }
  });

  // ——— Delete Post ———
  async function deletePost(id) {
    if (!confirm('Yakin ingin memindahkan post ke trash?')) return;
    try {
      await api(`${API_BASE}/${id}`, 'DELETE');
      await fetchPosts();
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.message || 'Gagal menghapus post');
    }
  }

  // ——— Restore Post ———
  async function restorePost(id) {
    try {
      await api(`${API_BASE}/${id}/restore`, 'POST');
      await fetchPosts();
    } catch (err) {
      console.error('Restore error:', err);
      alert(err.message || 'Gagal memulihkan post');
    }
  }

  // ——— Bookmark Toggle ———
  async function toggleBookmark(item, id) {
    const isBookmarked = item.querySelector('.bookmark').textContent === 'Unbookmark';
    const method = isBookmarked ? 'DELETE' : 'POST';
    try {
      await api(`${API_BASE}/${id}/bookmark`, method);
      await fetchPosts();
    } catch (err) {
      console.error('Bookmark error:', err);
      alert(err.message || 'Gagal memperbarui bookmark');
    }
  }

  // ——— Edit Post Inline ———
  function editPost(item, id) {
    const h3 = item.querySelector('h3');
    const p  = item.querySelector('p');
    const oldTitle   = h3.textContent;
    const oldContent = p.textContent;

    h3.innerHTML = `<input type="text" value="${escapeHTML(oldTitle)}" class="edit-title">`;
    p.innerHTML  = `<textarea class="edit-content">${escapeHTML(oldContent)}</textarea>`;
    item.querySelector('.actions').innerHTML = `
      <button class="btn-sm save">Simpan</button>
      <button class="btn-sm cancel">Batal</button>
    `;

    item.querySelector('.cancel').addEventListener('click', fetchPosts);
    item.querySelector('.save').addEventListener('click', async () => {
      const newTitle   = item.querySelector('.edit-title').value.trim();
      const newContent = item.querySelector('.edit-content').value.trim();
      try {
        await api(`${API_BASE}/${id}`, 'PUT', { title: newTitle, content: newContent });
        await fetchPosts();
      } catch (err) {
        console.error('Update error:', err);
        alert(err.message || 'Gagal menyimpan perubahan');
      }
    });
  }

  // ——— Logout ———
  logoutBtn?.addEventListener('click', async () => {
    try {
      await api('/auth/logout', 'POST');
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout error:', err);
      alert(err.message || 'Gagal logout, coba lagi.');
    }
  });

  // ——— Reload Button ———
  reloadBtn?.addEventListener('click', fetchPosts);

  // ——— Init ———
  fetchProfile();
  fetchPosts();
});
