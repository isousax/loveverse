import { useEffect, useState } from 'react'
import FloatingHearts from './FloatingHearts'

export default function FinalSection({ startDate }) {
  const [timePassed, setTimePassed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [heartsTrigger, setHeartsTrigger] = useState(false)
  const [isClicked, setIsClicked] = useState(false) // estado para efeito clique

  useEffect(() => {
    function updateTime() {
      const now = new Date()
      const diff = now - startDate
      const totalSeconds = Math.floor(diff / 1000)
      const days = Math.floor(totalSeconds / (3600 * 24))
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      setTimePassed({ days, hours, minutes, seconds })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [startDate])

  const handleClick = () => {
    console.log('[FinalSection] Botão clicado')

    // Efeito visual "apertar"
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 200)

    // Força reset do trigger para garantir que um novo clique funcione mesmo durante o intervalo
    setHeartsTrigger(false)
    setTimeout(() => {
      setHeartsTrigger(true)
    }, 10)
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
          onComplete={() => {
            console.log('[FinalSection] onComplete chamado')
            setHeartsTrigger(false)
          }}
        />
      )}
    </section>
  )
}