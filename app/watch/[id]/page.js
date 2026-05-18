import Link from "next/link"
import AnimePlayer from "@/components/AnimePlayer"

async function getAnime(id) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, { cache: "no-store" })
    const data = await res.json()
    return data.data
  } catch { return null }
}

async function getRecommendations(id) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`, { cache: "no-store" })
    const data = await res.json()
    return data.data
  } catch { return [] }
}

async function getEpisodes(id) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`, { cache: "no-store" })
    const data = await res.json()
    return data.data
  } catch { return [] }
}

export default async function WatchPage({ params }) {
  const { id } = await params
  const anime = await getAnime(id)
  const recommendations = await getRecommendations(id)
  const episodes = await getEpisodes(id)

  if (!anime) return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-gray-400 text-xl">Anime not found.</p>
    </main>
  )

  const episodeList = episodes?.length > 0
    ? episodes
    : Array.from({ length: anime.episodes || 12 }, (_, i) => ({
        mal_id: i + 1,
        title: `Episode ${i + 1}`
      }))

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Main Layout: Player + Sidebar */}
      <div className="flex flex-col lg:flex-row lg:h-screen">

        {/* Left: Player + Info */}
        <div className="flex-1 flex flex-col overflow-y-auto">

          {/* Player - episode 1 plays directly */}
          <AnimePlayer
            malId={id}
            episodeNumber={1}
            animeTitle={anime.title}
            animeImage={anime.images.jpg.large_image_url}
          />

          {/* Below Player: Anime Info */}
          <div className="p-6 border-t border-white/5">

            {/* Anime row */}
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

            {/* Synopsis */}
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

          {/* Header */}
          <div className="p-4 border-b border-white/5">
            <h2 className="text-base font-bold">Episodes</h2>
            <p className="text-gray-500 text-xs">{episodeList.length} Episodes</p>
          </div>

          {/* Scrollable Episode List */}
          <div className="flex-1 overflow-y-auto">
            {episodeList.map((episode) => (
              <Link key={episode.mal_id} href={`/watch/${anime.mal_id}/ep/${episode.mal_id}`}>
                <div className="flex gap-3 p-4 hover:bg-purple-500/10 border-b border-white/5 transition cursor-pointer group">

                  <div className="w-11 h-11 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-sm font-bold text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition flex-shrink-0">
                    {episode.mal_id}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="font-semibold text-sm line-clamp-1 group-hover:text-purple-400 transition">
                      {episode.title || `Episode ${episode.mal_id}`}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">Episode {episode.mal_id}</p>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition text-purple-400 flex items-center text-xs">
                    ▶
                  </div>

                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>

    </main>
  )
}