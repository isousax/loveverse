import { useEffect, useState } from 'react'

export function useIsAppReady(minDelay = 900) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const startTime = performance.now()

    Promise.all([
      document.fonts.ready,
      new Promise((resolve) => requestAnimationFrame(resolve))
    ]).then(() => {
      const elapsed = performance.now() - startTime
      const remaining = Math.max(0, minDelay - elapsed)

      setTimeout(() => {
        setIsReady(true)
      }, remaining)
    })
  }, [minDelay])

  return isReady
}