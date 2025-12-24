"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center space-y-8 max-w-2xl">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mb-4">
            Merry Christmas
          </h1>
          <p className="text-2xl md:text-3xl text-rose-700 font-light italic">To My Love ❤️</p>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-200">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Giáng sinh năm nay chẳng cần điều ước gì xa xôi, vì món quà tuyệt vời nhất đã ở ngay cạnh anh rồi. Cảm ơn em vì đã khiến mùa đông của anh trở nên ấm áp hơn bao giờ hết. Mình cùng nhau đi qua thật nhiều mùa Noel nữa nhé!
            </p>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-500 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block text-4xl md:text-5xl animate-slow-bounce">✨🎄✨</div>
        </div>
      </div>
    </section>
  )
}
