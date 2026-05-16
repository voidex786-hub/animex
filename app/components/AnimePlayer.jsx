"use client"

import { MediaPlayer, MediaProvider } from "@vidstack/react"

export default function AnimePlayer({ src }) {
  return (
    <MediaPlayer
      title="Animex Player"
      src={src}
      autoPlay
      controls
      className="w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black"
    >
      <MediaProvider />
    </MediaPlayer>
  )
}