// pages/Blog.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Jika Anda ingin link internal

const Blog = () => {
  // Data dummy untuk artikel blog
  const blogPosts = [
    { id: 1, title: 'Artikel 1: Pengantar React', date: '2024-07-28', excerpt: 'Pelajari dasar-dasar React dan cara memulai...' },
    { id: 2, title: 'Artikel 2: Tips Pengembangan Node.js', date: '2024-07-25', excerpt: 'Kumpulan tips dan trik untuk meningkatkan produktivitas Anda dalam Node.js...' },
    { id: 3, title: 'Artikel 3: Panduan Tailwind CSS', date: '2024-07-20', excerpt: 'Cara menggunakan Tailwind CSS untuk membuat desain web yang responsif...' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <p className="text-gray-700 mb-4">{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} className="text-blue-500 hover:underline">
              Baca Selengkapnya
            </Link>
          </div>
        ))}
      </div>
       {/* Jika tidak ada artikel */}
      {blogPosts.length === 0 && (
        <div className="text-center text-gray-500">Belum ada artikel yang dipublikasikan.</div>
      )}
    </div>
  );
};

export default Blog;
