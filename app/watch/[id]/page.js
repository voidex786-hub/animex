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

async function getRecommendations(id) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/recommendations`,
    {
      cache: "no-store",
    }
  )

  const data = await res.json()

  return data.data
}

async function getEpisodes(id) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/episodes`,
    {
      cache: "no-store",
    }
  )

  const data = await res.json()

  return data.data
}

async function getCharacters(id) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/characters`,
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

  const recommendations = await getRecommendations(id)

  const episodes = await getEpisodes(id)

  const characters = await getCharacters(id)

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
        <div className="grid md:grid-cols-3 gap-10 mb-24">

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

              <div className="grid md:grid-cols-2 gap-4">

                {episodes?.map((episode) => (

                  <Link
                    key={episode.mal_id}
                    href={`/watch/${anime.mal_id}/episode/${episode.mal_id}`}
                  >

                   <div
  onClick={() => {

    localStorage.setItem(
      "continueWatching",
      JSON.stringify({
        animeId: anime.mal_id,
        animeTitle: anime.title,
        episode: i + 1,
        image: anime.images.jpg.large_image_url,
      })
    )

  }}
  className="bg-[#111] border border-white/10 rounded-2xl p-5 hover:border-purple-500 hover:bg-purple-500/10 transition duration-300 cursor-pointer"
>

                      <h3 className="font-bold text-lg mb-2">
                        Episode {episode.mal_id}
                      </h3>

                      <p className="text-gray-400 line-clamp-2">
                        {episode.title}
                      </p>

                    </div>

                  </Link>

                ))}

              </div>

            </div>

          </div>
        </div>

        {/* Characters */}
        <div className="mb-24">

          <h2 className="text-4xl font-bold mb-10">
            Characters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {characters?.slice(0, 8).map((character) => (

              <div
                key={character.character.mal_id}
                className="bg-[#111] border border-white/10 rounded-3xl p-5 flex gap-5 hover:border-purple-500 transition duration-300"
              >

                {/* Character Image */}
                <img
                  src={character.character.images.jpg.image_url}
                  alt={character.character.name}
                  className="w-24 h-24 object-cover rounded-2xl"
                />

                {/* Info */}
                <div className="flex-1">

                  <h3 className="text-xl font-bold mb-2">
                    {character.character.name}
                  </h3>

                  <p className="text-purple-400 mb-2">
                    {character.role}
                  </p>

                  <p className="text-gray-400 text-sm">
                    Voice Actor:
                    {" "}
                    {character.voice_actors?.[0]?.person?.name || "Unknown"}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Related Anime */}
        <div>

          <h2 className="text-4xl font-bold mb-10">
            You May Also Like
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

            {recommendations?.slice(0, 10).map((item) => (

              <Link
                key={item.entry.mal_id}
                href={`/anime/${item.entry.mal_id}`}
              >

                <div className="group bg-[#111] rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500 transition duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]">

                  <div className="overflow-hidden">

                    <img
                      src={item.entry.images.jpg.large_image_url}
                      alt={item.entry.title}
                      className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                    />

                  </div>

                  <div className="p-4">

                    <h3 className="font-bold line-clamp-2">
                      {item.entry.title}
                    </h3>

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