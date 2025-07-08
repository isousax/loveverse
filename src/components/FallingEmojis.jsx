import React from 'react'

export default function FallingEmojis({ emoji, colorClass, maxMobile = 10, maxDesktop = 20, opacity = 'opacity-50', animationClass = 'animate-fall' }) {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
  const count = isMobile ? maxMobile : maxDesktop

  const emojis = Array.from({ length: count })

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {emojis.map((_, i) => {
        const size = isMobile
          ? 6 + Math.random() * 10
          : 8 + Math.random() * 15
        const left = Math.random() * 100
        const delay = i * (isMobile ? 0.4 : 0.3)
        const duration = 6 + Math.random() * 6

        return (
          <span
            key={i}
            className={`absolute ${colorClass} ${opacity} ${animationClass}`}
            style={{
              top: 0,
              left: `${left}%`,
              fontSize: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            {emoji}
          </span>
        )
      })}
    </div>
  )
}
