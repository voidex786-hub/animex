"use client"

import { useState } from "react"

export default function AnimePlayer({ malId, episodeNumber }) {
  const [active, setActive] = useState("sub")

  const sources = [
    { key: "sub", label: "Sub" },
    { key: "dub", label: "Dub" },
  ]

  return (
    <div>
      {/* Server selector */}
      <div className="flex gap-3 mb-4">
        {sources.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition border ${
              active === s.key
                ? "bg-purple-600 border-purple-500 text-white"
                : "bg-[#111] border-white/10 text-gray-400 hover:border-purple-500"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Player */}
      <div
        className="rounded-3xl overflow-hidden border border-white/10 w-full bg-black"
        style={{ aspectRatio: "16/9" }}
      >
        <iframe
          key={`${malId}-${episodeNumber}-${active}`}
          src={`https://megaplay.buzz/stream/mal/${malId}/${episodeNumber}/${active}`}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; fullscreen"
        />
      </div>
    </div>
  )
}