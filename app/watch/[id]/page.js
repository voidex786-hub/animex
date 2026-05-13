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

export default async function WatchPage({ params }) {
  const { id } = await params

  const anime = await getAnime(id)

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Video Player */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden border border-white/10 mb-10">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Anime Player"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Anime Info */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* Poster */}
          <div>
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="rounded-3xl w-full"
            />
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h1 className="text-5xl font-bold mb-5">
              {anime.title}
            </h1>

            <div className="flex gap-6 flex-wrap text-lg mb-8">
              <p>⭐ {anime.score || "N/A"}</p>

              <p>{anime.episodes || "?"} Episodes</p>

              <p>{anime.status}</p>
            </div>

            <p className="text-gray-300 leading-8 mb-10">
              {anime.synopsis}
            </p>

            {/* Fake Episodes */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Episodes
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(12)].map((_, i) => (
                  <button
                    key={i}
                    className="bg-[#111] border border-white/10 rounded-2xl py-4 hover:border-purple-500 transition"
                  >
                    Episode {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}