import Link from "next/link"

async function getAnime(id) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, { cache: "no-store" })
  const data = await res.json()
  return data.data
}

async function getEpisodeDataId(animeTitle, episodeNumber) {
  try {
    // Search aniwatch.co.at for the anime
    const searchRes = await fetch(
      `https://aniwatch.co.at/?s=${encodeURIComponent(animeTitle)}`,
      { cache: "no-store" }
    )
    const html = await searchRes.text()
    
    // Extract data-id for the episode from the HTML
    // Pattern: data-number="X" data-id="XXXXX"
    const regex = new RegExp(`data-number="${episodeNumber}"\\s+data-id="(\\d+)"`)
    const match = html.match(regex)
    return match ? match[1] : null
  } catch {
    return null
  }
}

export default async function EpisodePage({ params }) {
  const { id, ep } = await params
  const episodeNumber = Number(ep)
  const anime = await getAnime(id)

  // Fetch the episode page on aniwatch.co.at to get data-id
  const episodeSlug = `${anime.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-episode-${episodeNumber}-english-subbed`
  
  let dataId = null
  try {
    const res = await fetch(`https://aniwatch.co.at/${episodeSlug}/`, { cache: "no-store" })
    const html = await res.text()
    const regex = new RegExp(`data-number="${episodeNumber}"[^>]*data-id="(\\d+)"`)
    const match = html.match(regex)
    if (match) dataId = match[1]
  } catch (e) {
    console.log("FETCH ERROR:", e.message)
  }

  console.log("anime title:", anime.title)
  console.log("slug tried:", episodeSlug)
  console.log("dataId found:", dataId)

  const streamUrl = dataId
    ? `https://1anime.site/megaplay/stream/s-2/${dataId}/sub`
    : null

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="w-full mb-12">
          {streamUrl ? (
            <div className="rounded-3xl overflow-hidden border border-white/10 w-full" style={{ aspectRatio: "16/9" }}>
              <iframe
                src={streamUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen"
                title={`${anime.title} Episode ${episodeNumber}`}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 rounded-3xl border border-white/10 text-white/40">
              Stream not available for this episode
            </div>
          )}
        </div>

        <div className="flex gap-4 flex-wrap">
          {episodeNumber > 1 && (
            <Link href={`/watch/${id}/ep/${episodeNumber - 1}`}>
              <button className="px-8 py-4 rounded-2xl bg-[#111] border border-white/10 hover:border-purple-500 transition">
                ← Previous Episode
              </button>
            </Link>
          )}
          <Link href={`/watch/${id}`}>
            <button className="px-8 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 transition">
              Back To Anime
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