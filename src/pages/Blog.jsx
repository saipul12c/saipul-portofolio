import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import postsData from './blog/blog.json';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setTimeout(() => {
        setPosts(postsData);
        setFilteredPosts(postsData);
        setLoading(false);
      }, 300);
    } catch (err) {
      console.error('Gagal memuat data post:', err);
      setError('Gagal memuat data dari file JSON.');
      setLoading(false);
    }
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(value) ||
      post.author?.name.toLowerCase().includes(value)
    );
    setFilteredPosts(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-indigo-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
            Blog Insights
          </h1>
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Cari judul atau penulis..."
              className="w-full max-w-md px-5 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPosts.map((post) => (
              <div
                key={post.slug}
                className="group flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition duration-300"
              >
                {post.image?.url && (
                  <div className="relative w-full aspect-video">
                    <img
                      src={post.image.url}
                      alt={post.image.alt || post.title}
                      className="object-cover w-full h-full rounded-t-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
                  </div>
                )}

                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h2>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 space-x-3">
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
                        className="flex items-center text-indigo-600 dark:text-indigo-300 hover:underline"
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

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                    {post.excerpt || post.content?.body?.slice(0, 120) + '...'}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    state={{ post }}
                    className="mt-auto text-center inline-block bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-full transition-colors"
                  >
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
            Tidak ada artikel ditemukan.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
