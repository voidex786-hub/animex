export default function Page() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden relative">

      {/* Glow Background */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/30 blur-[140px] rounded-full pointer-events-none"></div>

      {/* Stars */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:50px_50px]"></div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1 className="text-2xl font-extrabold tracking-widest">
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

            <a href="#reviews" className="hover:text-purple-400 transition">
              Reviews
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative px-6 text-center">

        <div className="max-w-6xl z-10">

          {/* Badge */}
          <div className="inline-block px-5 py-2 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-sm mb-8">
            #1 Anime Streaming Platform
          </div>

          {/* Video Hero */}
          <div className="relative w-full h-[320px] md:h-[420px] flex items-center justify-center overflow-hidden rounded-[40px] border border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.25)] mb-10">

            {/* Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src="https://cdn.pixabay.com/video/2023/09/17/180712-865613162_large.mp4"
                type="video/mp4"
              />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            {/* Text */}
            <h1
              className="
                relative z-10
                text-6xl
                md:text-[11rem]
                font-black
                tracking-[12px]
                uppercase
                text-white
                drop-shadow-[0_0_30px_rgba(168,85,247,0.7)]
              "
            >
              ANIMEX
            </h1>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-lg md:text-xl leading-8 max-w-3xl mx-auto">
            Stream trending anime episodes, movies, and classics in ultra HD.
            Fast servers, beautiful UI, and a premium anime experience.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-5 mt-10">

            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 font-semibold hover:-translate-y-1 transition duration-300 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
              Watch Now
            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/10 bg-[#111] font-semibold hover:-translate-y-1 transition duration-300">
              Browse Anime
            </button>

          </div>

        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-32 px-6 relative z-10"
      >
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-5">
              Watch Anime Your Way
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto leading-8">
              From casual viewing to marathon sessions, our platform adapts to your style.
            </p>
          </div>

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

              <div
                key={index}
                className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 hover:-translate-y-2 transition duration-300 hover:border-purple-500/40 hover:shadow-[0_0_35px_rgba(168,85,247,0.15)]"
              >

                <h3 className="text-2xl font-semibold mb-4">
                  {card.title}
                </h3>

                <p className="text-gray-400 leading-8">
                  {card.desc}
                </p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section
        id="discover"
        className="py-32 px-6"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          <div>

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
          </div>

          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1200&auto=format&fit=crop"
              alt="anime"
              className="rounded-[32px] border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.2)]"
            />
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section
        id="reviews"
        className="py-32 px-6"
      >
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

              <div
                key={index}
                className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 hover:border-purple-500/30 transition"
              >

                <div className="flex items-center gap-4 mb-5">

                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>

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

              </div>
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