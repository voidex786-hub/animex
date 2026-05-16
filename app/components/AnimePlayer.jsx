"use client"

import { useEffect, useRef } from "react"
import Plyr from "plyr"
import "plyr/dist/plyr.css"

export default function AnimePlayer({ src }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return

    const player = new Plyr(videoRef.current, {
      controls: [
        "play-large",
        "restart",
        "rewind",
        "play",
        "fast-forward",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      settings: ["speed"],
      speed: {
        selected: 1,
        options: [0.5, 0.75, 1, 1.25, 1.5, 2],
      },
    })

    return () => {
      player.destroy()
    }
  }, [])

  return (
    <div className="rounded-3xl overflow-hidden border border-white/10">
      <video
        ref={videoRef}
        className="w-full"
        controls
        autoPlay
      >
        <source src={src} type="application/x-mpegURL" />
      </video>
    </div>
  )
}