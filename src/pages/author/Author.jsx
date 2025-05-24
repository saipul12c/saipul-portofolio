import React from 'react';
import { useParams, Link } from 'react-router-dom';
import postsData from "../blog/blog.json";

const Author = () => {
  const { username } = useParams();

  const postsByAuthor = postsData.filter(
    (post) => post.author && post.author.username === username
  );

  if (postsByAuthor.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Penulis “{username}” Tidak Ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Tidak ada artikel yang dipublikasikan oleh penulis ini.
          </p>
          <Link to="/" className="inline-block font-medium text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400">
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const author = postsByAuthor[0].author;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-6 py-12 text-gray-900 dark:text-gray-100">
      {/* Profil Author */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden md:flex md:items-center md:gap-8 p-8">
        <div className="flex-shrink-0 text-center md:text-left">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 object-cover shadow-md mx-auto md:mx-0"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-700 shadow-md flex items-center justify-center text-2xl font-semibold text-gray-400">
              {author.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="mt-6 md:mt-0 text-center md:text-left flex-1 space-y-2">
          <h1 className="text-3xl font-extrabold flex items-center justify-center md:justify-start gap-2 relative group">
            {author.name}
            {author.verified && (
              <div className="relative group cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg shadow-lg px-4 py-2 text-sm w-max z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                  Penulis ini telah diverifikasi oleh sistem dan dapat dipercaya.
                </div>
              </div>
            )}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">{author.bio}</p>

          {author.email && (
            <a href={`mailto:${author.email}`} className="block text-indigo-600 hover:underline font-medium dark:text-indigo-400">
              {author.email}
            </a>
          )}

          {/* Tambahan info */}
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1 mt-4">
            {author.location && <p>📍 {author.location}</p>}
            {author.joinedAt && (
              <p>
                🗓️ Bergabung sejak{' '}
                {new Date(author.joinedAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                })}
              </p>
            )}
            {author.followers !== undefined && <p>👥 {author.followers.toLocaleString()} pengikut</p>}
            {author.social && (
              <div className="flex gap-4 mt-2 justify-center md:justify-start">
                {author.social.twitter && (
                  <a
                    href={`https://twitter.com/${author.social.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Twitter
                  </a>
                )}
                {author.social.linkedin && (
                  <a
                    href={author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 dark:text-blue-400 hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Daftar Post oleh Author */}
      <div className="max-w-7xl mx-auto mt-12 px-2">
        <h2 className="text-3xl font-semibold mb-8 text-center md:text-left text-gray-900 dark:text-white">
          Artikel oleh {author.name}
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {postsByAuthor.map((post) => (
            <div
              key={post.slug}
              className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transform transition-transform duration-300 hover:shadow-xl hover:scale-105"
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
                <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors dark:text-white">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {new Date(post.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-gray-700 dark:text-gray-300 flex-grow mb-6 line-clamp-3">
                  {post.excerpt || post.content?.body?.slice(0, 120) + '...'}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  state={{ post }}
                  className="mt-auto inline-block text-center font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-full hover:opacity-90 transition-opacity duration-200"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Author;
