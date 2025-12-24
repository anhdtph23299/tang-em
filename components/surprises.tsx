"use client"

import { useState } from "react"

const surprises = [
  "❤️ Anh/Chị yêu em nhiều lắm!",
  "💕 Em là niềm hạnh phúc của anh/chị",
  "🌹 Cảm ơn em đã ở bên anh/chị",
  "✨ Mỗi ngày với em đều là quà tặng",
  "🎄 Anh/Chị mong được ở bên em mãi mãi",
  "💑 Em là yêu thương của anh/chị",
  "🎁 Tình yêu anh/chị dành cho em là vĩnh viễn",
  "💕 Chúc em một Giáng sinh tuyệt vời nhất",
]

export default function Surprises() {
  const [currentSurprise, setCurrentSurprise] = useState(0)
  const [showSurprise, setShowSurprise] = useState(false)

  const handleSurprise = () => {
    setShowSurprise(false)
    setTimeout(() => {
      setCurrentSurprise(Math.floor(Math.random() * surprises.length))
      setShowSurprise(true)
    }, 200)
  }

  return (
    <section className="px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-rose-700 mb-12">Press for Surprise 🎁</h2>

        <div className="relative h-32 flex items-center justify-center mb-12">
          {showSurprise && (
            <div className="animate-slow-bounce bg-gradient-to-r from-rose-500 to-pink-500 rounded-full p-8 shadow-2xl">
              <p className="text-2xl md:text-3xl text-white font-bold text-pretty">{surprises[currentSurprise]}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleSurprise}
          className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95"
        >
          <span className="relative z-10">✨ Bấm để xem điều bất ngờ ✨</span>
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </section>
  )
}
