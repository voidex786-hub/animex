"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BrowsePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const animeList = [
    { id: 1, title: "Attack Mode", genre: "Action" },
    { id: 2, title: "Shadow Blade", genre: "Dark Fantasy" },
    { id: 3, title: "Neon Tokyo", genre: "Sci-Fi" },
    { id: 4, title: "Dragon Soul", genre: "Adventure" },
    { id: 5, title: "Void Hunters", genre: "Action" },
    { id: 6, title: "Moonlight Love", genre: "Romance" },
    { id: 7, title: "Cyber Shinobi", genre: "Cyberpunk" },
    { id: 8, title: "Demon Legacy", genre: "Horror" },
  ];

  const filteredAnime = animeList.filter((anime) =>
    anime.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">
          Browse <span className="text-purple-500">Anime</span>
        </h1>

        <p className="text-gray-400">
          Discover and explore your favorite anime
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search anime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-4 rounded-xl bg-[#111] border border-white/10 outline-none focus:border-purple-500"
        />
      </div>

      {/* Anime Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredAnime.map((anime) => (
          <div
            key={anime.id}
            onClick={() => router.push("/watch")}
            className="cursor-pointer bg-[#0d0d0d] border border-white/5 rounded-2xl p-5 hover:-translate-y-2 hover:border-purple-500/40 transition group"
          >
            {/* Thumbnail */}
            <div className="h-40 rounded-xl bg-gradient-to-br from-purple-500/20 to-black mb-4 group-hover:scale-105 transition"></div>

            {/* Title */}
            <h2 className="text-lg font-semibold">{anime.title}</h2>

            {/* Genre */}
            <p className="text-sm text-gray-400 mt-1">{anime.genre}</p>
          </div>
        ))}

      </div>

      {/* Empty state */}
      {filteredAnime.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No anime found.
        </p>
      )}

    </main>
  );
}