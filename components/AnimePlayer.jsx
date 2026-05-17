"use client"

import { useEffect, useRef, useState } from "react"

export default function AnimePlayer({ streams }) {
  const videoRef = useRef(null)
  const hlsRef = useRef(null)
  const [activeStream, setActiveStream] = useState("sub1")
  const [error, setError] = useState(false)

  const streamOptions = [
    { key: "sub1", label: "Sub - Server 1", url: streams.sub1 },
    { key: "sub2", label: "Sub - Server 2", url: streams.sub2 },
    { key: "dub1", label: "Dub", url: streams.dub1 },
  ].filter(s => s.url)

  useEffect(() => {
    const url = streams[activeStream]
    if (!url || !videoRef.current) return

    setError(false)

    if (typeof window === "undefined") return

    import("hls.js").then(({ default: Hls }) => {
      if (hlsRef.current) hlsRef.current.destroy()

      if (Hls.isSupported()) {
        const hls = new Hls()
        hlsRef.current = hls
        hls.loadSource(url)
        hls.attachMedia(videoRef.current)
        hls.on(Hls.Events.ERROR, () => setError(true))
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = url
      } else {
        setError(true)
      }
    })

    return () => {
      if (hlsRef.current) hlsRef.current.destroy()
    }
  }, [activeStream, streams])

  return (
    <div>
      {/* Stream selector */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {streamOptions.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveStream(s.key)}
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

      {/* Player */}
      <div className="rounded-3xl overflow-hidden border border-white/10 w-full bg-black relative" style={{ aspectRatio: "16/9" }}>
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-gray-400 text-xl mb-2">Stream failed to load.</p>
            <p className="text-gray-500 text-sm">Try a different server above.</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            controls
            autoPlay
            className="w-full h-full"
            style={{ background: "black" }}
          />
        )}
      </div>
    </div>
  )
}