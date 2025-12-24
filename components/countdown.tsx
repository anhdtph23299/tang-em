"use client"

import { useState, useEffect } from "react"

export default function Countdown() {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 365) // Ngày kỷ niệm tiếp theo

    const timer = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)))
        setHours(Math.floor((difference / (1000 * 60 * 60)) % 24))
        setMinutes(Math.floor((difference / 1000 / 60) % 60))
        setSeconds(Math.floor((difference / 1000) % 60))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const CountdownBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg p-4 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-lg">
        <span className="text-3xl md:text-4xl font-bold text-white">{String(value).padStart(2, "0")}</span>
      </div>
      <p className="text-xs md:text-sm text-rose-700 font-semibold mt-2 uppercase">{label}</p>
    </div>
  )

  return (
    <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-rose-700 mb-12">Countdown ⏰</h2>
        <div className="flex justify-center gap-4 md:gap-6">
          <CountdownBox value={days} label="Days" />
          <CountdownBox value={hours} label="Hours" />
          <CountdownBox value={minutes} label="Mins" />
          <CountdownBox value={seconds} label="Secs" />
        </div>
        <p className="text-gray-600 mt-8">Thời gian chúng ta sẽ có những kỷ niệm thêm...</p>
      </div>
    </section>
  )
}
