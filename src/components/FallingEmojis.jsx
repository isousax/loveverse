import { useState, useEffect, useMemo } from 'react'

export default function FallingEmojis({
  emoji,
  colorClass,
  maxMobile = 10,
  maxDesktop = 20,
  opacity = 'opacity-50',
  animationClass = 'animate-fall',
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const count = isMobile ? maxMobile : maxDesktop

  const emojis = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = isMobile ? 6 + Math.random() * 10 : 8 + Math.random() * 15
      const left = Math.random() * 100
      const delay = i * (isMobile ? 0.4 : 0.3)
      const duration = 6 + Math.random() * 6

      return { size, left, delay, duration, key: i }
    })
  }, [count, isMobile])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {emojis.map(({ size, left, delay, duration, key }) => (
        <span
          key={key}
          className={`absolute ${colorClass} ${opacity} ${animationClass}`}
          style={{
            top: 0,
            left: `${left}%`,
            fontSize: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
          aria-hidden="true"
        >
          {emoji}
        </span>
      ))}
    </div>
  )
}