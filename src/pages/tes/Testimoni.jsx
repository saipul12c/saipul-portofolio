// src/pages/tes/Testimoni.jsx
import React, { useState, useMemo } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Pagination } from "../../components/ui/pagination";
import { Star, StarHalf, StarOff, Search } from "lucide-react";
import { motion } from "framer-motion";

const testimonialsData = [
  {
    name: "Andi Pratama",
    position: "Product Manager at XYZ",
    avatar: "/avatars/andi.jpg",
    rating: 5,
    message: "Bekerja dengan Syaiful sangat luar biasa! Dedikasi dan profesionalismenya tak tertandingi.",
  },
  {
    name: "Siti Nurhaliza",
    position: "UI/UX Designer",
    avatar: "/avatars/siti.jpg",
    rating: 4.5,
    message: "Syaiful punya kemampuan leadership yang keren. Sangat menginspirasi tim.",
  },
  {
    name: "Joko Widodo",
    position: "CEO at Alpha Inc.",
    avatar: "/avatars/joko.jpg",
    rating: 5,
    message: "Selalu mengutamakan kualitas dan deadline. Terpercaya!",
  },
  // Tambahkan lebih banyak testimoni sesuai kebutuhan
];

const PER_PAGE = 3;

const Testimoni = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return testimonialsData.filter((t) =>
      `${t.name} ${t.position}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const paginated = useMemo(() => {
    return filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const avgRating = useMemo(() => {
    if (filtered.length === 0) return 0;
    const total = filtered.reduce((sum, t) => sum + t.rating, 0);
    return total / filtered.length;
  }, [filtered]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <Star
            key={i}
            className="w-4 h-4 text-yellow-500 fill-yellow-400"
          />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <StarHalf
            key={i}
            className="w-4 h-4 text-yellow-500 fill-yellow-400"
          />
        );
      } else {
        stars.push(
          <StarOff
            key={i}
            className="w-4 h-4 text-gray-300"
          />
        );
      }
    }
    return stars;
  };

  return (
    <section className="py-12 px-4 md:px-12 lg:px-24 bg-gradient-to-b from-white via-slate-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="text-center mb-8 space-y-2">
        <motion.h1
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          Muhammad Syaiful Mukmin
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-300">
          Testimoni pengalaman bekerja bersama Syaiful
        </p>
        <div className="flex justify-center items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
          <span className="font-medium">Rata-rata rating:</span>
          <span className="font-semibold">{avgRating.toFixed(1)}</span>
          <div className="flex">{renderStars(avgRating)}</div>
        </div>
      </div>

      <div className="relative max-w-md mx-auto mb-8">
        <Input
          placeholder="Cari nama atau posisi..."
          value={searchTerm}
          onChange={(e) => {
            setPage(1);
            setSearchTerm(e.target.value);
          }}
          className="pl-10"
        />
        <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map((t, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="shadow-lg rounded-2xl border border-indigo-100 dark:border-slate-700 hover:shadow-indigo-200 dark:hover:shadow-slate-800 transition-shadow duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border border-indigo-300 dark:border-slate-600"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-indigo-600 dark:text-indigo-300">
                      {t.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t.position}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200">{t.message}</p>
                <div className="flex">{renderStars(t.rating)}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination page={page} onChange={setPage} totalPages={totalPages} />
        </div>
      )}
    </section>
  );
};

export default Testimoni;
