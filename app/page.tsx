"use client"

import { useState, useEffect } from "react"
import Snowfall from "@/components/snowfall"
import Hero from "@/components/hero"
import Gallery from "@/components/gallery"
import GiftBox from "@/components/gift-box"
import MusicPlayer from "@/components/music-player"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-pink-50 via-pink-100 to-rose-50">
      <Snowfall />
      <MusicPlayer />
      <Hero />
      <div className="h-20" />
      <Gallery />
      <div className="h-32" />
      <div className="h-32" />
      <div className="h-40" />
      <GiftBox />
    </main>
  )
}
