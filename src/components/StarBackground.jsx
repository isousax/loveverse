import { useEffect, useRef } from 'react'

export default function StarBackground() {
  const starsRef = useRef([])

  useEffect(() => {
    const canvas = document.getElementById('starfield')
    const ctx = canvas.getContext('2d')

    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Gerar estrelas novamente com base no novo tamanho
      const stars = []
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          velocity: Math.random() * 0.5 + 0.05,
        })
      }
      starsRef.current = stars
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const stars = starsRef.current
      for (const star of stars) {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()

        star.y += star.velocity
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      }

      requestAnimationFrame(draw)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      id="starfield"
      className="fixed top-0 left-0 w-screen h-screen z-[-1]"
    />
  )
}