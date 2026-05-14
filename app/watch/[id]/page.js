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
    <main className="min-h-screen bg-black text-white px-6 py-10 overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-600/20 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Trailer */}
        <div className="w-full mb-12">

          {anime.trailer?.embed_url ? (

            <iframe
              src={anime.trailer.embed_url}
              width="100%"
              height="700"
              allowFullScreen
              className="rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.25)]"
            ></iframe>

          ) : (

            <div className="h-[700px] flex items-center justify-center bg-[#111] rounded-3xl border border-white/10">
              <p className="text-gray-400 text-2xl">
                No Trailer Available
              </p>
            </div>

          )}

        </div>

        {/* Now Watching */}
        <div className="mb-16">

          <h2 className="text-5xl font-bold mb-4">
            Now Watching
          </h2>

          <p className="text-gray-400 text-xl">
            {anime.title}
          </p>

        </div>

        {/* Anime Info */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* Poster */}
          <div>

            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="rounded-3xl w-full border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
            />

          </div>

          {/* Details */}
          <div className="md:col-span-2">

            <h1 className="text-5xl font-bold mb-6">
              {anime.title}
            </h1>

            <div className="flex gap-6 flex-wrap text-lg mb-8">

              <p className="text-purple-400">
                ⭐ {anime.score || "N/A"}
              </p>

              <p>
                {anime.episodes || "?"} Episodes
              </p>

              <p>
                {anime.status}
              </p>

            </div>

            <p className="text-gray-300 leading-8 mb-10">
              {anime.synopsis}
            </p>

            {/* Genres */}
            <div className="flex gap-4 flex-wrap mb-12">

              {anime.genres.map((genre) => (

                <div
                  key={genre.mal_id}
                  className="px-4 py-2 rounded-full bg-purple-600"
                >
                  {genre.name}
                </div>

              ))}

            </div>

            {/* Episodes */}
            <div>

              <h2 className="text-3xl font-bold mb-6">
                Episodes
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {[...Array(12)].map((_, i) => (

                  <button
                    key={i}
                    className="bg-[#111] border border-white/10 rounded-2xl py-4 hover:border-purple-500 hover:bg-purple-500/10 transition duration-300"
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