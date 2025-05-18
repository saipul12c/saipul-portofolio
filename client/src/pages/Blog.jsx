import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Gagal mengambil posts:', err);
        setError('Terjadi kesalahan saat memuat artikel.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-12">Blog</h1>
      {posts.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <div
              key={post.id}
              className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* If you have a thumbnail field, you can put an <img> here */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(post.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-gray-700 flex-grow mb-6 line-clamp-3">
                  {post.content.slice(0, 150)}...
                </p>
                <Link
                  to={`/blog/${slugify(post.title)}?id=${post.id}`}
                  className="mt-auto inline-block text-center font-medium bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">Belum ada artikel yang dipublikasikan.</div>
      )}
    </div>
  );
};

export default Blog;
