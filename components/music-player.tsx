"use client"

import { useState } from "react"
import { Music, Pause } from "lucide-react"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleMusic = () => {
    const audio = document.getElementById("bgm") as HTMLAudioElement
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play().catch(() => {
          // Silently handle autoplay restrictions
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <audio id="bgm" loop className="hidden">
          <source src="/Christmas.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={24} /> : <Music size={24} />}
      </button>
    </>
  )
}
