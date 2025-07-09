import React, { useEffect, useState } from 'react'
import Bolha from '../assets/bolha.svg'

const bolhasDesktop = [
  { top: '9%', left: '15%', size: 440, delay: '0s' },
  { top: '30%', left: '70%', size: 800, delay: '2s' },
  { top: '55%', left: '10%', size: 420, delay: '4s' },
  { top: '75%', left: '80%', size: 380, delay: '6s' },
  { top: '20%', left: '50%', size: 820, delay: '1s' },
  { top: '20%', left: '85%', size: 440, delay: '3s' },
  { top: '5%', left: '5%', size: 360, delay: '1.5s' },
  { top: '85%', left: '15%', size: 780, delay: '3.5s' },
  { top: '8%', left: '90%', size: 370, delay: '5s' },
  { top: '65%', left: '60%', size: 410, delay: '6.5s' },
  { top: '19%', left: '22%', size: 630, delay: '2.5s' },
  { top: '-18%', left: '40%', size: 630, delay: '2.5s' },
  { top: '60%', left: '10%', size: 800, delay: '4.5s' },
  { top: '10%', left: '60%', size: 400, delay: '5.5s' },
]

const bolhasMobile = [
  { top: '1%', left: '2%', size: 300, delay: '0s' },
  { top: '25%', left: '75%', size: 180, delay: '2s' },
  { top: '40%', left: '-8%', size: 210, delay: '4s' },
  { top: '77%', left: '7%', size: 200, delay: '1s' },
  { top: '78%', left: '53%', size: 360, delay: '3s' },
  { top: '-1%', left: '-8%', size: 160, delay: '1.5s' },
  { top: '35%', left: '50%', size: 200, delay: '5s' },
  { top: '50%', left: '50%', size: 270, delay: '6.5s' },
  { top: '55%', left: '8%', size: 280, delay: '4.5s' },
  { top: '-1%', left: '55%', size: 130, delay: '5.5s' },
]

export default function FloatingBubbles() {
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia('(max-width: 768px)').matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handler = (e) => setIsMobile(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const bolhas = isMobile ? bolhasMobile : bolhasDesktop

  return (
    <>
      {bolhas.map(({ top, left, size, delay }, i) => (
        <img
          key={i}
          src={Bolha}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute opacity-30 animate-bolha-flutuante pointer-events-none"
          style={{ top, left, width: size, height: size, animationDelay: delay, zIndex: 0 }}
        />
      ))}

      <style>{`
        @keyframes bolhaFlutuante {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-40px); }
        }
        .animate-bolha-flutuante {
          animation: bolhaFlutuante 30s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}