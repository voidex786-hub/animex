import AnimePlayer from "@/components/AnimePlayer"
import Link from "next/link"

const API = "https://animekai-api-production-16e5.up.railway.app"

async function getAnime(id) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, { cache: "no-store" })
    const data = await res.json()
    return data.data
  } catch {
    return null
  }
}

async function getAnimeKaiSlug(title) {
  try {
    const res = await fetch(`${API}/api/search?keyword=${encodeURIComponent(title)}`, { cache: "no-store" })
    const data = await res.json()
    if (data.success && data.results.length > 0) return data.results[0].slug
    return null
  } catch {
    return null
  }
}

async function getAniId(slug) {
  try {
    const res = await fetch(`${API}/api/anime/${slug}`, { cache: "no-store" })
    const data = await res.json()
    return data.ani_id || null
  } catch {
    return null
  }
}

async function getEpisodeToken(ani_id, episodeNumber) {
  try {
    const res = await fetch(`${API}/api/episodes/${ani_id}`, { cache: "no-store" })
    const data = await res.json()
    const episode = data.episodes.find(ep => ep.number === String(episodeNumber))
    return episode?.token || null
  } catch {
    return null
  }
}

async function getServers(token) {
  try {
    const res = await fetch(`${API}/api/servers/${token}`, { cache: "no-store" })
    const data = await res.json()
    return data.servers || null
  } catch {
    return null
  }
}

async function getSource(link_id) {
  try {
    const res = await fetch(`${API}/api/source/${link_id}`, { cache: "no-store" })
    const data = await res.json()
    return data.sources?.[0]?.file || null
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

  // Full pipeline
  const slug = await getAnimeKaiSlug(anime.title)
  const ani_id = slug ? await getAniId(slug) : null
  const token = ani_id ? await getEpisodeToken(ani_id, episodeNumber) : null
  const servers = token ? await getServers(token) : null

  // Get sub and dub sources
  const subLinkId = servers?.sub?.[0]?.link_id || null
  const dubLinkId = servers?.dub?.[0]?.link_id || null
  const subLinkId2 = servers?.sub?.[1]?.link_id || null

  const subStream = subLinkId ? await getSource(subLinkId) : null
  const dubStream = dubLinkId ? await getSource(dubLinkId) : null
  const subStream2 = subLinkId2 ? await getSource(subLinkId2) : null

  const streams = {
    sub1: subStream,
    sub2: subStream2,
    dub1: dubStream,
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 relative">

      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-600/20 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Back + Title */}
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

        {/* Player */}
        {subStream ? (
          <AnimePlayer streams={streams} />
        ) : (
          <div className="w-full rounded-3xl bg-[#0d0d0d] border border-white/10 flex items-center justify-center" style={{ aspectRatio: "16/9" }}>
            <p className="text-gray-400 text-xl">Stream not available for this episode.</p>
          </div>
        )}

        {/* Navigation */}
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