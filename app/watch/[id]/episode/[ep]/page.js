"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function EpisodePage({ params }) {
  const { id, ep } = params
  const episodeNumber = Number(ep)
  const [streamUrl, setStreamUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [animeTitle, setAnimeTitle] = useState("")

  useEffect(() => {
    async function loadStream() {
      try {
        // Get anime title from Jikan
        const jikanRes = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
        const jikanData = await jikanRes.json()
        const title = jikanData.data.title
        setAnimeTitle(title)

        // Build slug
        const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-episode-${episodeNumber}-english-subbed`

        // Fetch aniwatch page from browser (no CORS block)
        const pageRes = await fetch(`https://aniwatch.co.at/${slug}/`)
        const html = await pageRes.text()

        // Extract dataId
        const regex = new RegExp(`data-number="${episodeNumber}"[^>]*data-id="(\\d+)"`)
        const match = html.match(regex)

        if (match) {
          setStreamUrl(`https://1anime.site/megaplay/stream/s-2/${match[1]}/sub`)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadStream()
  }, [id, ep])

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <div className="w-full mb-12">
          {loading ? (
            <div className="flex items-center justify-center h-64 rounded-3xl border border-white/10 text-white/40">
              Loading stream...
            </div>
          ) : streamUrl ? (
            <div className="rounded-3xl overflow-hidden border border-white/10 w-full" style={{ aspectRatio: "16/9" }}>
              <iframe
                src={streamUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen"
                title={`${animeTitle} Episode ${episodeNumber}`}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 rounded-3xl border border-white/10 text-white/40">
              Stream not available for this episode
            </div>
          )}
        </div>

        <div className="flex gap-4 flex-wrap">
          {episodeNumber > 1 && (
            <Link href={`/watch/${id}/ep/${episodeNumber - 1}`}>
              <button className="px-8 py-4 rounded-2xl bg-[#111] border border-white/10 hover:border-purple-500 transition">
                ← Previous Episode
              </button>
            </Link>
          )}
          <Link href={`/watch/${id}`}>
            <button className="px-8 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 transition">
              Back To Anime
            </button>
          </Link>
          <Link href={`/watch/${id}/ep/${episodeNumber + 1}`}>
            <button className="px-8 py-4 rounded-2xl bg-[#111] border border-white/10 hover:border-purple-500 transition">
              Next Episode →
            </button>
          </Link>
        </div>

      </div>
    </main>
  )
}