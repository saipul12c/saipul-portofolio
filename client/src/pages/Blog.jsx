import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Gagal mengambil posts:', err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded shadow p-4 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{new Date(post.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-4">
              {post.content.slice(0, 100)}...
            </p>
            <Link
              to={`/blog/${slugify(post.title)}?id=${post.id}`}
              className="text-blue-500 hover:underline"
            >
              Baca Selengkapnya
            </Link>
          </div>
        ))}
      </div>
      {posts.length === 0 && (
        <div className="text-center text-gray-500">Belum ada artikel yang dipublikasikan.</div>
      )}
    </div>
  );
};

export default Blog;
