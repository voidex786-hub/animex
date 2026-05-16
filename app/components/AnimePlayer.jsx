"use client"

export default function AnimePlayer({ src }) {
  return (
    <video
      src={src}
      controls
      autoPlay
      className="w-full rounded-3xl border border-white/10 bg-black"
    />
  )
}