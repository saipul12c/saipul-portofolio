import React from 'react';
import { useParams, Link } from 'react-router-dom';
import postsData from '../../data/post.json';

const Author = () => {
  const { username } = useParams();

  // Filter posts yang ditulis oleh author dengan username tertentu
  const postsByAuthor = postsData.filter(
    (post) => post.author && post.author.username === username
  );

  // Jika tidak ditemukan post sama sekali, berarti author tidak ada atau tidak menulis apa-apa
  if (postsByAuthor.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4">Penulis “{username}” Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">Tidak ada artikel yang dipublikasikan oleh penulis ini.</p>
          <Link to="/" className="inline-block font-medium text-indigo-600 hover:text-indigo-800">
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  // Ambil detail author dari salah satu post mereka (diasumsikan data author seragam di semua post)
  const author = postsByAuthor[0].author;

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-12">
      {/* Profil Author */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative">
          {author.avatar && (
            <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl -mt-16"
              />
            </div>
          )}
          {!author.avatar && (
            <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-xl -mt-16 flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-400">
                  {author.name.charAt(0)}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="p-8 text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center space-x-2">
            <span>{author.name}</span>
            {author.verified && (
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
            )}
          </h1>
          {author.bio && <p className="text-gray-700">{author.bio}</p>}
          {author.email && (
            <a
              href={`mailto:${author.email}`}
              className="text-indigo-600 hover:underline font-medium"
            >
              {author.email}
            </a>
          )}
        </div>
      </div>

      {/* Daftar Post oleh Author */}
      <div className="max-w-7xl mx-auto mt-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
          Artikel oleh {author.name}
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {postsByAuthor.map((post) => (
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
                <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(post.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-gray-700 flex-grow mb-6 line-clamp-3">
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
