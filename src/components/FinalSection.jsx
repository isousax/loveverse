import { useState, useRef } from 'react'
import FloatingHearts from './FloatingHearts'
import useElapsedTime from '../hooks/useElapsedTime'
import { useAppContext } from '../context/AppContext'

export default function FinalSection() {
  const { startDate } = useAppContext()
  const timePassed = useElapsedTime(startDate)

  const [heartsTrigger, setHeartsTrigger] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const triggerTimeout = useRef(null)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 200)

    if (triggerTimeout.current) clearTimeout(triggerTimeout.current)
    setHeartsTrigger(false)
    triggerTimeout.current = setTimeout(() => setHeartsTrigger(true), 10)
  }

  return (
    <section className="final-section min-h-[100dvh] flex items-center justify-center relative overflow-hidden snap-start snap-always">
      <div
        className="final-bg absolute inset-0 w-full h-full"
        style={{
          background:
            'radial-gradient(circle, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.133)) rgb(18, 18, 18)',
          filter: 'blur(10px)',
          transform: 'scale(1.1)',
        }}
      ></div>

      <div
        className="w-[90%] max-w-3xl final-content text-white text-center p-8 md:p-10 relative z-10 backdrop-blur-md rounded-2xl shadow-2xl border border-white border-opacity-10 bg-black bg-opacity-70"
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.5) 0px 25px 50px -12px, rgba(99, 102, 241, 0.3) 0px 0px 30px',
        }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
          Nossa História Continua...
        </h2>

        <p
          className="text-xl md:text-2xl mb-10 leading-relaxed text-white/80 max-w-2xl mx-auto px-4"
          style={{ textShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px' }}
        >
          Cada dia é uma nova oportunidade de escrever mais um capítulo juntos
        </p>

        <div className="mb-10">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white/90">
            Dias lado a lado:
          </h3>

          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {[
              { label: 'dias', value: timePassed.days },
              { label: 'horas', value: timePassed.hours },
              { label: 'minutos', value: timePassed.minutes },
              { label: 'segundos', value: timePassed.seconds },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4 border border-white/20 w-full max-w-[100px]"
              >
                <span className="text-[12px] md:text-[20px] lg:text-1xl font-bold text-white whitespace-nowrap w-full text-center">
                  {value.toString().padStart(2, '0')}
                </span>
                <span className="text-[8px] md:text-sm text-white/80 mt-1 whitespace-nowrap w-full text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleClick}
            className={`bg-white text-black font-bold py-4 px-10 rounded-full hover:bg-opacity-90 transition-all shadow-lg text-lg relative overflow-hidden
              ${isClicked ? 'scale-95 shadow-md' : ''}
            `}
            style={{ transition: 'transform 0.15s ease, box-shadow 0.15s ease' }}
          >
            Te amo ❤️
          </button>
        </div>
      </div>

      {heartsTrigger && (
        <FloatingHearts
          trigger={heartsTrigger}
          onComplete={() => setHeartsTrigger(false)}
        />
      )}
    </section>
  )
}