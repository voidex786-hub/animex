async function getAnime(id) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}`
  )

  const data = await res.json()

  return data.data
}

export default async function AnimePage({ params }) {
  const anime = await getAnime(params.id)

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full rounded-3xl"
        />

        <div>
          <h1 className="text-5xl font-bold mb-6">
            {anime.title}
          </h1>

          <div className="flex gap-6 mb-8 text-lg flex-wrap">
            <p>⭐ {anime.score}</p>

            <p>{anime.episodes} Episodes</p>

            <p>{anime.status}</p>
          </div>

          <p className="text-gray-300 leading-8">
            {anime.synopsis}
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            {anime.genres.map((genre) => (
              <div
                key={genre.mal_id}
                className="px-4 py-2 rounded-full bg-purple-600"
              >
                {genre.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}