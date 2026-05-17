import Link from "next/link"

async function getAnime(id) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, { cache: "no-store" })
  const data = await res.json()
  return data.data
}

export default async function EpisodePage({ params }) {
  const { id, ep } = await params
  const episodeNumber = Number(ep)
  const anime = await getAnime(id)

  const slug = `${anime.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-episode-${episodeNumber}-english-subbed`

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <div className="w-full mb-12">
          <div className="rounded-3xl overflow-hidden border border-white/10 w-full" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={`https://aniwatch.co.at/${slug}/`}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen"
              title={`${anime.title} Episode ${episodeNumber}`}
            />
          </div>
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