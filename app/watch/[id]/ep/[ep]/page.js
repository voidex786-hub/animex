import AnimePlayer from "@/components/AnimePlayer"
import Link from "next/link"

async function getAnime(id) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, { cache: "no-store" })
    const data = await res.json()
    return data.data
  } catch {
    return null
  }
}

export default async function EpisodePage({ params }) {
  const { id, ep } = await params
  const episodeNumber = Number(ep)

  const anime = await getAnime(id)
  if (!anime) return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-gray-400 text-xl">Anime not found.</p>
    </main>
  )

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 relative">

      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-600/20 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="mb-6">
          <Link href={`/watch/${id}`}>
            <span className="text-gray-400 hover:text-purple-400 transition text-sm">
              ← Back to {anime.title}
            </span>
          </Link>
          <h1 className="text-3xl font-bold mt-2">
            {anime.title}{" "}
            <span className="text-purple-400">— Episode {episodeNumber}</span>
          </h1>
        </div>

        <AnimePlayer
  malId={id}
  episodeNumber={episodeNumber}
  animeTitle={anime.title}
  animeImage={anime.images.jpg.large_image_url}
/>

        <div className="flex gap-4 flex-wrap mt-8">
          {episodeNumber > 1 && (
            <Link href={`/watch/${id}/ep/${episodeNumber - 1}`}>
              <button className="px-8 py-4 rounded-2xl bg-[#111] border border-white/10 hover:border-purple-500 transition">
                ← Previous Episode
              </button>
            </Link>
          )}
          <Link href={`/watch/${id}`}>
            <button className="px-8 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 transition">
              All Episodes
            </button>
          </Link>
          <Link href={`/watch/${id}/ep/${episodeNumber + 1}`}>
            <button className="px-8 py-4 rounded-2xl bg-[#111] border border-white/10 hover:border-purple-500 transition">
              Next Episode →
            </button>
          </Link>
        </div>

      </div>
    </main>
  )
}