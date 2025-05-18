// src/components/AiVersion.jsx
import React from 'react';
import aiVersionData from '../../data/aiVersion.json';

const AiVersion = () => {
  const {
    version,
    updatedAt,
    releaseDate,
    author,
    notes,
    compatibility,
    knownIssues
  } = aiVersionData;

  const formatDate = iso =>
    new Date(iso).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  return (
    <div className="mx-auto px-4 py-6 max-w-4xl space-y-8">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 text-white rounded-2xl p-6 shadow-md transform hover:scale-[1.02] transition">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Saipul AI</h2>
        <p className="text-sm md:text-base">
          <span className="font-semibold">v{version}</span> — diperbarui {formatDate(updatedAt)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Release Metadata */}
        <section className="bg-white dark:bg-neutral-900 rounded-xl shadow p-5 space-y-3">
          <h3 className="text-xl font-semibold border-b pb-2">Release Metadata</h3>
          <ul className="text-sm space-y-1">
            <li><strong>Release Date:</strong> {formatDate(releaseDate)}</li>
            <li><strong>Author:</strong> {author}</li>
          </ul>
        </section>

        {/* Compatibility & Known Issues */}
        <section className="space-y-6">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-5">
            <h3 className="text-xl font-semibold border-b pb-2 mb-2">Compatibility</h3>
            <ul className="text-sm space-y-1">
              <li><strong>Min Client:</strong> {compatibility.minClientVersion}</li>
              <li>
                <strong>Tested on:</strong>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  {compatibility.testedOn.map((b,i) => <li key={i}>{b}</li>)}
                </ul>
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-5">
            <h3 className="text-xl font-semibold border-b pb-2 mb-2">Known Issues</h3>
            <ul className="text-sm list-disc list-inside space-y-1">
              {knownIssues.map((issue,i) => <li key={i}>{issue}</li>)}
            </ul>
          </div>
        </section>
      </div>

      {/* Release Notes */}
      <section className="bg-white dark:bg-neutral-900 rounded-xl shadow p-5">
        <h3 className="text-2xl font-semibold mb-4 text-center">Release Notes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {[
            { title: 'New Features', items: notes.newFeatures },
            { title: 'Improvements', items: notes.improvements },
            { title: 'Bug Fixes', items: notes.bugFixes },
          ].map((group, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="font-medium text-base">{group.title}</h4>
              <ul className="list-disc list-inside space-y-1">
                {group.items.map((text,i) => <li key={i}>{text}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AiVersion;
