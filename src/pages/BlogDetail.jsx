import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import postsData from './blog/blog.json';

const BlogDetail = () => {
  const location = useLocation();
  const { slug } = useParams();
  const postFromState = location.state && location.state.post;
  const [post, setPost] = useState(postFromState || null);
  const [loading, setLoading] = useState(!postFromState);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (postFromState) return;

    const found = postsData.find((p) => p.slug === slug);
    if (!found) {
      setError('Artikel tidak ditemukan.');
      setLoading(false);
      return;
    }

    setPost(found);
    setLoading(false);
  }, [postFromState, slug]);

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
        <p className="font-medium">{error}</p>
        <div className="mt-6">
          <Link to="/blog" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            &larr; Kembali ke daftar Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <article className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden">
          {post.image?.url && (
            <div className="relative w-full aspect-video">
              <img
                src={post.image.url}
                alt={post.image.alt || post.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          <div className="p-8 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>

              <div className="flex items-center mt-2 sm:mt-0 space-x-3">
                {post.author?.avatar && (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                {post.author ? (
                  <Link
                    to={`/Author/${post.author.username}`}
                    className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
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
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-200 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
              {post.content?.body ? (
                <div dangerouslySetInnerHTML={{ __html: post.content.body }} />
              ) : (
                <p>{post.excerpt || 'Tidak ada konten untuk ditampilkan.'}</p>
              )}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <Link
                to="/blog"
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                &larr; Kembali ke daftar Blog
              </Link>
              {post.stats?.views && post.stats?.readingTime && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {post.stats.views.toLocaleString()} tayangan &middot; {post.stats.readingTime}
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
