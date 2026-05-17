"use client"

import { useState } from "react"

export default function EpisodePlayer({ sources, animeTitle, episode }) {
  const [activeSource, setActiveSource] = useState(0)
  const [playerError, setPlayerError] = useState(false)

  return (
    <div>
      {/* Server selector */}
      <div className="flex gap-3 mb-4">
        {sources.map((source, i) => (
          <button
            key={i}
            onClick={() => { setActiveSource(i); setPlayerError(false) }}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition border ${
              activeSource === i
                ? "bg-purple-600 border-purple-500 text-white"
                : "bg-[#111] border-white/10 text-gray-400 hover:border-purple-500"
            }`}
          >
            {source.label}
          </button>
        ))}
      </div>

      {/* Player */}
      <div
        className="rounded-3xl overflow-hidden border border-white/10 w-full relative"
        style={{ aspectRatio: "16/9" }}
      >
        {playerError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d0d] text-center px-6">
            <p className="text-gray-400 text-xl mb-4">
              This server couldn't load the episode.
            </p>
            <p className="text-gray-500 text-sm">
              Try another server above, or check back later.
            </p>
          </div>
        ) : (
          <iframe
            key={activeSource}
            src={sources[activeSource].url}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen"
            title={`${animeTitle} Episode ${episode}`}
          />
        )}
      </div>
    </div>
  )
}