import Link from "next/link"

async function getAnime(id) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}`,
    {
      cache: "no-store",
    }
  )

  const data = await res.json()

  return data.data
}

export default async function EpisodePage({ params }) {
  const { id, ep } = await params

  const anime = await getAnime(id)

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Fake Video Player */}
        <div className="w-full h-[700px] rounded-3xl bg-[#111] border border-white/10 flex items-center justify-center mb-12">

          <div className="text-center">

            <h1 className="text-6xl font-bold mb-4">
              Episode {ep}
            </h1>

            <p className="text-gray-400 text-xl">
              {anime.title}
            </p>

          </div>

        </div>

        {/* Navigation */}
        <div className="flex gap-4 flex-wrap">

          {Number(ep) > 1 && (
            <Link href={`/watch/${id}/episode/${Number(ep) - 1}`}>

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

          <Link href={`/watch/${id}/episode/${Number(ep) + 1}`}>

            <button className="px-8 py-4 rounded-2xl bg-[#111] border border-white/10 hover:border-purple-500 transition">
              Next Episode →
            </button>

          </Link>

        </div>

      </div>

    </main>
  )
}