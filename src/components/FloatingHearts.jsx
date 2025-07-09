import { useEffect, useState } from 'react'

export default function FloatingHearts({ trigger, count = 13, onComplete }) {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    if (!trigger) return

    console.log('[FloatingHearts] Trigger ativado. Gerando corações...')

    const newHearts = Array.from({ length: count }).map(() => ({
      id: crypto.randomUUID(),
      left: `${15 + Math.random() * 70}%`, // 15% → 85%
      top: `${20 + Math.random() * 60}%`,  // 20% → 80%
      delay: Math.random() * 0.3,
      duration: 1.9 + Math.random() * 1, // duração dos corações
      size: 20 + Math.random() * 12,
    }))

    setHearts(newHearts)

    const timeout = setTimeout(() => {
      console.log('[FloatingHearts] Timeout finalizado. Removendo corações...')
      setHearts([])
      onComplete?.()
    }, 2500)

    return () => {
      clearTimeout(timeout)
      console.log('[FloatingHearts] Limpando timeout anterior.')
    }
  }, [trigger])

  return (
    <>
      {hearts.map(({ id, left, top, delay, duration, size }) => (
        <span
          key={id}
          style={{
            position: 'fixed',
            left,
            top,
            fontSize: size,
            animation: `floatHeart ${duration}s ease-out ${delay}s forwards`,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 9999,
            opacity: 0,
          }}
        >
          ❤️
        </span>
      ))}

      <style jsx="true">{`
        @keyframes floatHeart {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-80px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}