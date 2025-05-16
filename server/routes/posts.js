// routes/posts.js
const express = require('express');
const router = express.Router();

// Import handler modules
const listHandlers     = require('./handlers/postsList');
const crudHandlers     = require('./handlers/postsCrud');
const bookmarkHandlers = require('./handlers/bookmarks');
const commentHandlers  = require('./handlers/comments');

// ——— LISTING & SEARCH ———
router.get('/',                     listHandlers.listPosts);

// ——— STATS, FEED & SITEMAP ———
router.get('/stats/tag-cloud',     listHandlers.tagCloud);
router.get('/stats/archive',       listHandlers.archive);
router.get('/stats/popular',       listHandlers.popularPosts);
router.get('/stats/overview',      listHandlers.overviewStats);
router.get('/feed/rss',            listHandlers.rssFeed);
router.get('/sitemap.xml',         listHandlers.sitemap);

// ——— RELATED POSTS ———
router.get('/:id/related',         listHandlers.relatedPosts);

// ——— CRUD (Create, Update, Delete, Restore) ———
router.post('/',                   crudHandlers.createPost);
router.put('/:id',                 crudHandlers.updatePost);
router.delete('/:id',              crudHandlers.softDeletePost);
router.post('/:id/restore',        crudHandlers.restorePost);

// ——— USER-SPECIFIC POSTS ———
router.get('/user/mine/all',       crudHandlers.userPosts);
router.get('/user/trash',          crudHandlers.userTrash);

// ——— BOOKMARKS ———
router.post('/:id/bookmark',       bookmarkHandlers.addBookmark);
router.delete('/:id/bookmark',     bookmarkHandlers.removeBookmark);
router.get('/user/bookmarks',      bookmarkHandlers.listBookmarks);

// ——— COMMENTS ———
router.post('/:id/comment',        commentHandlers.addComment);
router.get('/:id/comments',        commentHandlers.listComments);
router.put('/:postId/comment/:commentId',    commentHandlers.updateComment);
router.delete('/:postId/comment/:commentId', commentHandlers.deleteComment);

// ——— CATCH-ALL POST BY SLUG (placed last to avoid overriding other routes) ———
router.get('/:slug',               listHandlers.getPostBySlug);

module.exports = router;
