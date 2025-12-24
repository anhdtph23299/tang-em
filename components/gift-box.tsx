"use client"

import { useState, useEffect } from "react"
import GachaWheelModal from "./gacha-wheel-modal"

const confettiArray = Array.from({ length: 50 }, (_, i) => i)

// PHẢI KHỚP 100% THỨ TỰ VỚI FILE MODAL
const gachaRewards = [
    { id: 1, name: "Siêu cấp Trà Sữa", emoji: "🧋" },
    { id: 2, name: "Bữa ăn tối Unlimited", emoji: "🍽️" },
    { id: 3, name: 'Voucher "Người yêu lý tưởng"', emoji: "💆" },
    { id: 4, name: 'Thử thách "Người yêu ngoan"', emoji: "💋" },
    { id: 5, name: "Nấu cơm cho anh 1 tuần", emoji: "🍳" },
    { id: 6, name: 'Thẻ "Anh luôn đúng"', emoji: "🤐" },
    { id: 7, name: "Quà Giáng Sinh Bí Mật", emoji: "🎁" },
    { id: 8, name: 'Thẻ "Miễn Tử Kim Bài"', emoji: "👑" }, // Index 7 - Jackpot
]

export default function GiftBox() {
    const [opened, setOpened] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const [shake, setShake] = useState(false)
    const [showGachaModal, setShowGachaModal] = useState(false)
    const [claimedJackpot, setClaimedJackpot] = useState(false)
    const [claimedRewardIndex, setClaimedRewardIndex] = useState<number | null>(null)

    useEffect(() => {
        const claimed = localStorage.getItem("reward_claimed")
        const rewardIndexStr = localStorage.getItem("reward_index")

        if (claimed === "bf_jackpot" && rewardIndexStr !== null) {
            const idx = parseInt(rewardIndexStr)
            if (!isNaN(idx) && gachaRewards[idx]) {
                setClaimedJackpot(true)
                setClaimedRewardIndex(idx)
            }
        }
    }, [])

    const handleOpen = () => {
        if (opened) return
        setOpened(true)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
    }

    const handleGachaClick = () => {
        if (claimedJackpot) return
        setShowGachaModal(true)
    }

    const handleGachaClaimed = (rewardIndex: number) => {
        setClaimedJackpot(true)
        setClaimedRewardIndex(rewardIndex)
        localStorage.setItem("reward_claimed", "bf_jackpot")
        localStorage.setItem("reward_index", String(rewardIndex))
    }

    return (
        <section className="px-4 py-20 text-center relative overflow-hidden min-h-screen">
            <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes wobble {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-5px); }
          30% { transform: translateX(5px); }
          60% { transform: translateX(5px); }
        }
        @keyframes slow-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-confetti { animation: confetti 3s ease-out forwards; }
        .gift-wobble { animation: wobble 4.8s ease-in-out; }
        .animate-slow-bounce { animation: slow-bounce 3s ease-in-out infinite; }
      `}</style>

            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50">
                    {confettiArray.map((i) => (
                        <div
                            key={i}
                            className="absolute animate-confetti"
                            style={{
                                left: `${Math.random() * 100}vw`,
                                top: "-5vh",
                                animationDelay: `${Math.random() * 2}s`,
                                fontSize: "24px",
                            }}
                        >
                            {i % 2 === 0 ? "💕" : "✨"}
                        </div>
                    ))}
                </div>
            )}

            <div className="max-w-2xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-rose-700 mb-12 drop-shadow-sm uppercase tracking-tighter">
                    Special Gift 🎁
                </h2>

                <div className="relative h-64 md:h-80 flex items-center justify-center mb-12">
                    {!opened ? (
                        <div
                            className={`relative w-48 h-48 cursor-pointer transition-all hover:scale-110 active:scale-95 ${shake ? "gift-wobble" : ""}`}
                            onClick={handleOpen}
                        >
                            <div className="absolute inset-0 rounded-full blur-3xl bg-rose-400/30 animate-pulse" />
                            <div className="relative text-9xl md:text-[11rem] drop-shadow-2xl select-none animate-slow-bounce">
                                🎁
                            </div>
                            <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-max text-rose-500 font-bold animate-pulse text-sm">
                                CHẠM ĐỂ MỞ 👆
                            </p>
                        </div>
                    ) : (
                        /* Hiển thị Vé khi đã mở */
                        <div className="w-full max-w-md animate-in zoom-in duration-500">
                            <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl border-2 border-rose-100 relative overflow-hidden">

                                <div className="inline-flex items-center gap-2 mb-4">
                                    <span className="text-xl">🎟️</span>
                                    <p className="text-xl md:text-2xl text-rose-700 font-black tracking-tighter">VÉ YÊU EM</p>
                                    <span className="text-xl">🎟️</span>
                                </div>

                                <div className="relative border-4 border-dashed border-rose-300 rounded-2xl p-6 bg-gradient-to-br from-rose-50/50 to-pink-50/50">
                                    {/* Stamp chính chủ */}
                                    <div className="absolute bottom-2 right-4 flex flex-col items-center opacity-40 -rotate-12 pointer-events-none">
                                        <span className="text-3xl">❤️</span>
                                        <span className="text-[10px] font-black text-rose-600">CHÍNH CHỦ</span>
                                    </div>

                                    <p className="text-3xl font-black text-rose-600 tracking-widest mb-6 italic">LOVE2025</p>

                                    <div className="space-y-3 text-left text-xs md:text-sm font-medium text-gray-700 mb-8">
                                        <p>✨ <b>Quyền lợi:</b> Yêu thương trọn đời, được chiều chuộng 24/7.</p>
                                        <p>💝 <b>Bảo hành:</b> Một đổi một (không thay thế người yêu).</p>
                                        <p>💕 <b>Thời hạn:</b> Đến khi nào em chán anh thì thôi.</p>
                                    </div>

                                    {/* Nút nhận quà hoặc Hiển thị kết quả */}
                                    <div className="pt-4 border-t border-rose-200">
                                        {claimedJackpot && claimedRewardIndex !== null ? (
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-200 uppercase">
                                                    ✓ Quà tặng đã nhận
                                                </div>
                                                <div className="bg-amber-100 w-full p-4 rounded-xl border-2 border-amber-200 flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top-2">
                                                    <span className="text-4xl">{gachaRewards[claimedRewardIndex]?.emoji}</span>
                                                    <div className="text-left">
                                                        <p className="text-[10px] text-amber-700 font-bold uppercase tracking-tighter">Phần thưởng của em:</p>
                                                        <p className="text-sm font-black text-amber-900 leading-tight">
                                                            {gachaRewards[claimedRewardIndex]?.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={handleGachaClick}
                                                className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all animate-pulse flex items-center justify-center gap-2 uppercase text-sm tracking-tight"
                                            >
                                                💎 Nhận quà tặng đính kèm
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <p className="mt-6 text-[11px] text-gray-400 font-medium italic">
                                    * Vé có giá trị sử dụng cho mọi yêu cầu vô lý nhất từ phía em.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {opened && (
                    <button
                        onClick={() => setOpened(false)}
                        className="mt-8 px-6 py-2 bg-white/50 text-gray-500 rounded-full text-xs font-bold hover:bg-white transition-all uppercase tracking-widest border border-gray-100"
                    >
                        Đóng quà lại
                    </button>
                )}
            </div>

            {showGachaModal && (
                <GachaWheelModal
                    onClose={() => setShowGachaModal(false)}
                    onJackpotClaimed={handleGachaClaimed}
                />
            )}
        </section>
    )
}