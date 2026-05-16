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

        {/* Real Video Player */}
<div className="w-full mb-12">

  <iframe
  src={`https://vidsrc.xyz/embed/anime?mal=${id}&ep=${ep}`}
  width="100%"
  height="700"
  allowFullScreen
  className="rounded-3xl border border-white/10"
/>

</div>

        {/* Navigation */}
        <div className="flex gap-4 flex-wrap">

          {Number(ep) > 1 && (
            <Link href={`/watch/${id}/ep/${Number(ep) - 1}`}>

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

          <Link href={`/watch/${id}/ep/${Number(ep) + 1}`}>

            <button className="px-8 py-4 rounded-2xl bg-[#111] border border-white/10 hover:border-purple-500 transition">
              Next Episode →
            </button>

          </Link>

        </div>

      </div>

    </main>
  )
}