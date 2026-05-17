"use client"

import { useEffect, useRef, useState } from "react"

const API = "https://animekai-api-production-16e5.up.railway.app"

export default function AnimePlayer({ animeTitle, episodeNumber }) {
  const videoRef = useRef(null)
  const hlsRef = useRef(null)
  const [streams, setStreams] = useState({ sub1: null, sub2: null, dub1: null })
  const [activeStream, setActiveStream] = useState("sub1")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchStreams() {
      setLoading(true)
      setError(false)
      try {
        const searchRes = await fetch(`${API}/api/search?keyword=${encodeURIComponent(animeTitle)}`)
        const searchData = await searchRes.json()
        if (!searchData.success || !searchData.results.length) throw new Error("Not found")

        const slug = searchData.results[0].slug
        const animeRes = await fetch(`${API}/api/anime/${slug}`)
        const animeData = await animeRes.json()
        const ani_id = animeData.ani_id

        const epsRes = await fetch(`${API}/api/episodes/${ani_id}`)
        const epsData = await epsRes.json()
        const episode = epsData.episodes.find(ep => ep.number === String(episodeNumber))
        if (!episode) throw new Error("Episode not found")

        const serversRes = await fetch(`${API}/api/servers/${episode.token}`)
        const serversData = await serversRes.json()

        const getStream = async (link_id) => {
          if (!link_id) return null
          const res = await fetch(`${API}/api/source/${link_id}`)
          const data = await res.json()
          return data.sources?.[0]?.file || null
        }

        const [sub1, sub2, dub1] = await Promise.all([
          getStream(serversData.servers?.sub?.[0]?.link_id),
          getStream(serversData.servers?.sub?.[1]?.link_id),
          getStream(serversData.servers?.dub?.[0]?.link_id),
        ])

        setStreams({ sub1, sub2, dub1 })
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchStreams()
  }, [animeTitle, episodeNumber])

  useEffect(() => {
    const url = streams[activeStream]
    if (!url || !videoRef.current) return

    const proxyUrl = `https://m3u8-proxy-production-3b62.up.railway.app/m3u8-proxy?url=${encodeURIComponent(url)}&headers=${encodeURIComponent(JSON.stringify({"referer":"https://megaup.cc/"}))}`

    import("hls.js").then(({ default: Hls }) => {
      if (hlsRef.current) hlsRef.current.destroy()
      if (Hls.isSupported()) {
        const hls = new Hls()
        hlsRef.current = hls
        hls.loadSource(proxyUrl)
        hls.attachMedia(videoRef.current)
        hls.on(Hls.Events.ERROR, () => setError(true))
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = proxyUrl
      }
    })

    return () => { if (hlsRef.current) hlsRef.current.destroy() }
  }, [activeStream, streams])

  const streamOptions = [
    { key: "sub1", label: "Sub - Server 1", url: streams.sub1 },
    { key: "sub2", label: "Sub - Server 2", url: streams.sub2 },
    { key: "dub1", label: "Dub", url: streams.dub1 },
  ].filter(s => s.url)

  return (
    <div>
      <div className="flex gap-3 mb-4 flex-wrap">
        {streamOptions.map((s) => (
          <button
            key={s.key}
            onClick={() => { setActiveStream(s.key); setError(false) }}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition border ${
              activeStream === s.key
                ? "bg-purple-600 border-purple-500 text-white"
                : "bg-[#111] border-white/10 text-gray-400 hover:border-purple-500"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="rounded-3xl overflow-hidden border border-white/10 w-full bg-black relative" style={{ aspectRatio: "16/9" }}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-gray-400 text-xl mb-2">Stream failed to load.</p>
            <p className="text-gray-500 text-sm">Try a different server above.</p>
          </div>
        ) : (
          <video ref={videoRef} controls autoPlay className="w-full h-full" style={{ background: "black" }} />
        )}
      </div>
    </div>
  )
}