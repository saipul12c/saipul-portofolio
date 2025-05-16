// public/js/dashboard.js

// ——— Helper API & Error Handling ———
async function api(path, method = 'GET', data) {
  const opts = { method, credentials: 'include' };
  if (data) {
    opts.headers = { 'Content-Type': 'application/json' };
    opts.body = JSON.stringify(data);
  }
  const res = await fetch(`/api${path}`, opts);
  let json;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
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
  const modalOverlay       = profileModal.querySelector('.modal-overlay');
  const closeProfileModal  = document.getElementById('closeProfileModal');
  const profileForm        = document.getElementById('profileForm');
  const saveProfileBtn     = document.getElementById('saveProfileBtn');
  const profileError       = document.getElementById('profile-error');

  // Form fields di modal
  const modalAvatar        = document.getElementById('modalAvatar');
  const modalNameInput     = document.getElementById('modalName');
  const modalEmailInput    = document.getElementById('modalEmail');
  const modalBioInput      = document.getElementById('modalBio');
  const modalPhoneInput    = document.getElementById('modalPhone');
  const modalAddressInput  = document.getElementById('modalAddress');
  const modalTwitterInput  = document.getElementById('modalTwitter');
  const modalLinkedinInput = document.getElementById('modalLinkedin');

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
    profileError.hidden = true;
    profileModal.hidden = false;
  }
  function closeModal() {
    profileModal.hidden = true;
  }
  userProfileBtn?.addEventListener('click', async () => {
    await fetchProfile();
    openModal();
  });
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
        avatarUrl
      } = res.profile;

      // header display
      usernameDisplay.textContent = name || username;
      if (avatarUrl) avatarImg.src = avatarUrl;

      // isi form modal
      if (avatarUrl) modalAvatar.src = avatarUrl;
      modalNameInput.value     = name || '';
      modalEmailInput.value    = email || '';
      modalBioInput.value      = bio || '';
      modalPhoneInput.value    = phone || '';
      modalAddressInput.value  = address || '';
      modalTwitterInput.value  = twitter || '';
      modalLinkedinInput.value = linkedin || '';
    } catch (err) {
      console.error('Fetch profile error:', err);
    }
  }

  // ——— Save Profile (Update) ———
  profileForm?.addEventListener('submit', async e => {
    e.preventDefault();
    profileError.hidden = true;

    // Bangun payload hanya untuk field yang diisi
    const payload = {};
    const nameVal     = modalNameInput.value.trim();
    const emailVal    = modalEmailInput.value.trim();
    const bioVal      = modalBioInput.value.trim();
    const phoneVal    = modalPhoneInput.value.trim();
    const addressVal  = modalAddressInput.value.trim();
    const twitterVal  = modalTwitterInput.value.trim();
    const linkedinVal = modalLinkedinInput.value.trim();

    if (nameVal)     payload.name    = nameVal;
    if (emailVal)    payload.email   = emailVal;
    if (bioVal)      payload.bio     = bioVal;
    if (phoneVal)    payload.phone   = phoneVal;
    if (addressVal)  payload.address = addressVal;

    // social hanya kalau ada
    payload.social = {};
    if (twitterVal)  payload.social.twitter  = twitterVal;
    if (linkedinVal) payload.social.linkedin = linkedinVal;
    // hapus social kalau kosong
    if (!twitterVal && !linkedinVal) delete payload.social;

    try {
      const res = await api('/auth/profile', 'PUT', payload);
      if (handleApiErrors(res)) {
        profileError.hidden = false;
        profileError.textContent = res.error || 'Validasi gagal';
        return;
      }
      // sukses update: refresh header & tutup modal
      const updated = res.profile;
      usernameDisplay.textContent = updated.name || updated.username;
      if (updated.avatarUrl) avatarImg.src = updated.avatarUrl;
      closeModal();
      alert('🎉 Profile berhasil diperbarui!');
    } catch (err) {
      console.error('Update profile error:', err);
      profileError.hidden = false;
      profileError.textContent = err.message;
    }
  });

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

  // ——— Delete / Restore / Bookmark / Edit Post ———
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

  async function restorePost(id) {
    try {
      await api(`${API_BASE}/${id}/restore`, 'POST');
      await fetchPosts();
    } catch (err) {
      console.error('Restore error:', err);
      alert(err.message || 'Gagal memulihkan post');
    }
  }

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

  // ——— Logout & Reload ———
  logoutBtn?.addEventListener('click', async () => {
    try {
      await api('/auth/logout', 'POST');
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout error:', err);
      alert(err.message || 'Gagal logout, coba lagi.');
    }
  });
  reloadBtn?.addEventListener('click', fetchPosts);

  // ——— Init ———
  fetchPosts();
});
