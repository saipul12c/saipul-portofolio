import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import postsData from '../../data/post.json';

const Blog = () => {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    try {
      setTimeout(() => {
        setPosts(postsData);
        setLoading(false);
      }, 300);
    } catch (err) {
      console.error('Gagal memuat data post:', err);
      setError('Gagal memuat data dari file JSON.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
        Blog Insights
      </h1>

      {posts.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="group flex flex-col bg-white rounded-2xl shadow-md overflow-hidden transform transition-transform duration-300 hover:shadow-xl hover:scale-105"
            >
              {post.image?.url && (
                <div className="relative w-full aspect-w-16 aspect-h-9">
                  <img
                    src={post.image.url}
                    alt={post.image.alt || post.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>

                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </time>

                  <span>•</span>

                  {post.author ? (
                    <Link
                      to={`/Author/${post.author.username}`}
                      className="flex items-center text-indigo-600 hover:underline"
                    >
                      {post.author.avatar && (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                      )}
                      <span className="font-medium">{post.author.name}</span>
                      {post.author.verified && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-blue-500 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </Link>
                  ) : (
                    <span>Unknown Author</span>
                  )}
                </div>

                <p className="text-sm text-gray-400 mb-6 flex-grow line-clamp-3">
                  {post.excerpt || post.content?.body?.slice(0, 120) + '...'}
                </p>

                <Link
                  to={`/blog/${post.slug}`}
                  state={{ post }}
                  className="mt-auto inline-block text-center font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-full hover:opacity-90 transition-opacity duration-200"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-12">
          Belum ada artikel yang dipublikasikan.
        </div>
      )}
    </div>
  );
};

export default Blog;
