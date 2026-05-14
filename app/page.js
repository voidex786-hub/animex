"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Page() {
  const [animeList, setAnimeList] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchTopAnime()
  }, [])

  async function fetchTopAnime() {
    const res = await fetch("https://api.jikan.moe/v4/top/anime")

    const data = await res.json()

    setAnimeList(data.data.slice(0, 10))
  }

  async function searchAnime(query) {
    setSearch(query)

    if (query.trim() === "") {
      fetchTopAnime()

      return
    }

    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}`
    )

    const data = await res.json()

    setAnimeList(data.data.slice(0, 10))

    setTimeout(() => {
      document.getElementById("anime")?.scrollIntoView({
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden relative">

      {/* Glow Background */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/30 blur-[140px] rounded-full pointer-events-none"></div>

      {/* Stars */}
     <div className="absolute inset-0 opacity-20 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:50px_50px]"></div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between">

          <h1 className="text-3xl font-extrabold tracking-widest">
            ANI<span className="text-purple-500">MEX</span>
          </h1>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="#" className="hover:text-purple-400 transition">
              Home
            </a>

            <a href="#features" className="hover:text-purple-400 transition">
              Features
            </a>

            <a href="#discover" className="hover:text-purple-400 transition">
              Discover
            </a>

            <a href="#anime" className="hover:text-purple-400 transition">
              Anime
            </a>
          </div>

          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => searchAnime(e.target.value)}
            placeholder="Search anime..."
            className="w-full md:w-[300px] px-5 py-3 rounded-2xl bg-[#111] border border-white/10 outline-none focus:border-purple-500 transition"
          />
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="absolute inset-0 overflow-hidden">

  {[...Array(60)].map((_, i) => (
    <div
      key={i}
      className="absolute bg-white rounded-full animate-pulse"
      style={{
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random(),
        animationDuration: `${Math.random() * 3 + 2}s`,
      }}
    />
  ))}

</div>
      <section className="min-h-screen flex items-center justify-center relative px-6 pt-44 md:pt-32 text-center overflow-hidden">
        <div className="max-w-4xl z-10">

          <div className="flex flex-col items-center gap-4 mb-8">

  {/* Owner Insta */}
  <motion.a
  href="https://www.instagram.com/voidex.nx/?utm_source=ig_web_button_share_sheet"
  target="_blank"
  rel="noopener noreferrer"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-300 text-xs sm:text-sm hover:bg-pink-500/20 transition shadow-[0_0_20px_rgba(236,72,153,0.25)] max-w-full"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm8.75 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5z"/>
  </svg>

  Owner: @voidex.nx
</motion.a>

  {/* Anime Badge */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    className="inline-block px-5 py-2 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-sm"
  >
    #1 Anime Streaming Platform
  </motion.div>

</div>

          <motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="text-5xl sm:text-6xl md:text-8xl font-extrabold ..."
>
  ANIMEX
</motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-gray-400 text-lg leading-8 max-w-2xl mx-auto"
          >
            Stream trending anime episodes, movies, and classics in ultra HD.
            Fast servers, beautiful UI, and a premium anime experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="flex flex-wrap justify-center gap-5 mt-10"
          >
            <a href="#anime">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 font-semibold hover:-translate-y-1 transition shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105">
                Watch Now
              </button>
            </a>

            <a href="#anime">
              <button className="px-8 py-4 rounded-xl border border-white/10 bg-[#111] font-semibold hover:-translate-y-1 transition hover:bg-[#1a1a1a]">
                Browse Anime
              </button>
            </a>
          </motion.div>

        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-5">
              Watch Anime Your Way
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto leading-8">
              From casual viewing to marathon sessions, our platform adapts to your style.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: "Quick Sessions",
                desc: "Watch episodes during breaks with automatic progress saving.",
              },
              {
                title: "Binge-Friendly",
                desc: "Watch complete seasons without interruptions and buffering.",
              },
              {
                title: "Deep Dive",
                desc: "Explore thousands of anime titles with advanced filters.",
              },
            ].map((card, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 hover:-translate-y-2 transition hover:border-purple-500/40 hover:shadow-[0_0_35px_rgba(168,85,247,0.15)]"
              >
                <h3 className="text-2xl font-semibold mb-4">
                  {card.title}
                </h3>

                <p className="text-gray-400 leading-8">
                  {card.desc}
                </p>
              </motion.div>

            ))}

          </div>
        </div>
      </section>

      {/* Trending Anime */}
      <section id="anime" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div>
              <h2 className="text-5xl font-bold mb-3">
                {search ? `Results for "${search}"` : "Trending Anime"}
              </h2>

              <p className="text-gray-400">
                Live anime data powered by Jikan API
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

            {animeList.map((anime, index) => (

              <Link
                key={anime.mal_id}
                href={`/anime/${anime.mal_id}`}
              >

                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-[#0d0d0d] rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/40 transition duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]"
                >

                  {/* Image */}
                  <div className="relative overflow-hidden">

                    <img
                      src={anime.images.jpg.large_image_url}
                      alt={anime.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="w-16 h-16 rounded-full bg-purple-600/90 flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                        ▶
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-sm border border-white/10">
                      ⭐ {anime.score || "N/A"}
                    </div>

                  </div>

                  {/* Info */}
                  <div className="p-5">

                    <h3 className="font-bold text-lg line-clamp-1 mb-2">
                      {anime.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-gray-400">

                      <p>
                        {anime.episodes || "?"} Episodes
                      </p>

                      <p className="text-purple-400">
                        {anime.status}
                      </p>

                    </div>
                  </div>

                </motion.div>

              </Link>

            ))}

          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="discover" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Fast, Reliable Anime Streaming
            </h2>

            <p className="text-gray-400 leading-8 mb-10">
              Built for speed and reliability. Watch anime in HD without buffering,
              sync progress across devices, and enjoy a premium viewing experience.
            </p>

            <div className="flex flex-wrap gap-10">

              <div>
                <h3 className="text-4xl font-bold text-purple-500">
                  10K+
                </h3>

                <p className="text-gray-400 mt-2">
                  Anime Titles
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-purple-500">
                  1080p
                </h3>

                <p className="text-gray-400 mt-2">
                  HD Streaming
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-purple-500">
                  24/7
                </h3>

                <p className="text-gray-400 mt-2">
                  Fast Servers
                </p>
              </div>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >

            <img
              src="https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1200&auto=format&fit=crop"
              alt="anime"
              className="rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:scale-[1.02] transition duration-500"
            />

          </motion.div>

        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-5">
              What They Say...
            </h2>

            <p className="text-gray-400">
              Thousands of anime fans love using Animex every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                name: "Lmao",
                text: "Animex has the cleanest anime streaming UI I have ever used.",
              },
              {
                name: "Abadima",
                text: "Fast loading, amazing dark design and smooth animations.",
              },
              {
                name: "Yaromix",
                text: "One of the best anime streaming websites visually.",
              },
            ].map((review, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 hover:border-purple-500/30 transition"
              >

                <div className="flex items-center gap-4 mb-5">

                  <div className="w-14 h-14 rounded-full bg-purple-500"></div>

                  <div>
                    <h4 className="font-semibold text-lg">
                      {review.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      @user
                    </p>
                  </div>

                </div>

                <p className="text-gray-300 leading-8">
                  {review.text}
                </p>

              </motion.div>

            ))}

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-14 px-6">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

          <div>
            <h2 className="text-3xl font-bold mb-4">
              ANI<span className="text-purple-500">MEX</span>
            </h2>

            <p className="text-gray-500 max-w-sm leading-7">
              Premium anime streaming experience with modern UI and fast servers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-16">

            <div>
              <h4 className="font-semibold mb-4">
                Browse
              </h4>

              <div className="space-y-2 text-gray-500">
                <p>Trending</p>
                <p>Movies</p>
                <p>TV Shows</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">
                Resources
              </h4>

              <div className="space-y-2 text-gray-500">
                <p>FAQ</p>
                <p>Contact</p>
                <p>Privacy</p>
              </div>
            </div>

          </div>
        </div>

        <div className="text-center text-gray-600 mt-16 text-sm">
          © 2026 ANIMEX — All Rights Reserved
        </div>

      </footer>

    </main>
  )
}