"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import AnimePlayer from "@/components/AnimePlayer"

export default function WatchPage({ params }) {
  const [anime, setAnime] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [activeEp, setActiveEp] = useState(1)
  const [loading, setLoading] = useState(true)

  const id = params.id

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [animeRes, epRes, recRes] = await Promise.all([
          fetch(`https://api.jikan.moe/v4/anime/${id}`),
          fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`),
          fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`),
        ])
        const [animeData, epData, recData] = await Promise.all([
          animeRes.json(),
          epRes.json(),
          recRes.json(),
        ])
        setAnime(animeData.data)
        setRecommendations(recData.data || [])

        const eps = epData.data?.length > 0
          ? epData.data
          : Array.from({ length: animeData.data?.episodes || 12 }, (_, i) => ({
              mal_id: i + 1,
              title: `Episode ${i + 1}`,
            }))
        setEpisodes(eps)
      } catch (e) {
        console.error(e)
      }
      setLoading(false)
    }
    fetchData()
  }, [id])

  if (loading) return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </main>
  )

  if (!anime) return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <p className="text-gray-400 text-xl">Anime not found.</p>
    </main>
  )

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="flex flex-col lg:flex-row lg:h-screen">

        {/* Left: Player + Info */}
        <div className="flex-1 flex flex-col overflow-y-auto">

          <AnimePlayer
            malId={id}
            episodeNumber={activeEp}
            animeTitle={anime.title}
            animeImage={anime.images.jpg.large_image_url}
          />

          {/* Prev / Next buttons */}
          <div className="flex gap-3 px-6 pt-4">
            <button
              onClick={() => setActiveEp((e) => Math.max(1, e - 1))}
              disabled={activeEp === 1}
              className="px-5 py-2 rounded-xl bg-[#111] border border-white/10 hover:border-purple-500 transition text-sm disabled:opacity-30"
            >
              ← Prev
            </button>
            <button
              onClick={() => setActiveEp((e) => Math.min(episodes.length, e + 1))}
              disabled={activeEp === episodes.length}
              className="px-5 py-2 rounded-xl bg-[#111] border border-white/10 hover:border-purple-500 transition text-sm disabled:opacity-30"
            >
              Next →
            </button>
          </div>

          {/* Anime Info */}
          <div className="p-6 border-t border-white/5 mt-4">
            <div className="flex gap-5 mb-6">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-16 h-20 object-cover rounded-xl border border-white/10 flex-shrink-0"
              />
              <div>
                <h1 className="text-xl font-bold mb-2">{anime.title}</h1>
                <div className="flex gap-3 text-xs text-gray-400 flex-wrap mb-3">
                  <span>TV</span>
                  <span>•</span>
                  <span>{anime.status}</span>
                  <span>•</span>
                  <span>{anime.year || "N/A"}</span>
                  <span>•</span>
                  <span>⭐ {anime.score || "N/A"}</span>
                  <span>•</span>
                  <span>{anime.episodes || "?"} Episodes</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {anime.genres?.map((genre) => (
                    <span key={genre.mal_id} className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 text-xs border border-purple-500/20">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-7 line-clamp-3 mb-8">
              {anime.synopsis}
            </p>

            {/* Recommendations */}
            {recommendations?.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4">Recommendations</h2>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {recommendations.slice(0, 12).map((item) => (
                    <Link key={item.entry.mal_id} href={`/anime/${item.entry.mal_id}`}>
                      <div className="group bg-[#111] rounded-xl overflow-hidden border border-white/5 hover:border-purple-500 transition hover:scale-105">
                        <img
                          src={item.entry.images.jpg.large_image_url}
                          alt={item.entry.title}
                          className="w-full h-28 object-cover group-hover:scale-110 transition duration-500"
                        />
                        <div className="p-2">
                          <p className="text-xs font-semibold line-clamp-2 text-gray-300">{item.entry.title}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Episode Sidebar */}
        <div className="w-full lg:w-[360px] bg-[#0f0f0f] border-l border-white/5 flex flex-col lg:h-screen">
          <div className="p-4 border-b border-white/5">
            <h2 className="text-base font-bold">Episodes</h2>
            <p className="text-gray-500 text-xs">{episodes.length} Episodes</p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {episodes.map((episode) => (
              <div
                key={episode.mal_id}
                onClick={() => setActiveEp(episode.mal_id)}
                className={`flex gap-3 p-4 border-b border-white/5 transition cursor-pointer group ${
                  activeEp === episode.mal_id
                    ? "bg-purple-600/20 border-l-2 border-l-purple-500"
                    : "hover:bg-purple-500/10"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center text-sm font-bold transition flex-shrink-0 ${
                  activeEp === episode.mal_id
                    ? "bg-purple-600 border-purple-500 text-white"
                    : "bg-[#1a1a1a] border-white/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white"
                }`}>
                  {episode.mal_id}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className={`font-semibold text-sm line-clamp-1 transition ${
                    activeEp === episode.mal_id ? "text-purple-400" : "group-hover:text-purple-400"
                  }`}>
                    {episode.title || `Episode ${episode.mal_id}`}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">Episode {episode.mal_id}</p>
                </div>

                {activeEp === episode.mal_id && (
                  <div className="text-purple-400 flex items-center text-xs">▶</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}