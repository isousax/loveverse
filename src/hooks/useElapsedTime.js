import { useEffect, useState } from 'react'

export default function useElapsedTime(startDate) {
  const [timePassed, setTimePassed] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    if (!startDate) return

    function updateTime() {
      const now = new Date()
      const diff = now - startDate
      const totalSeconds = Math.floor(diff / 1000)

      const days = Math.floor(totalSeconds / (3600 * 24))
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      // Calcular anos
      let years = now.getFullYear() - startDate.getFullYear()
      const currentMonth = now.getMonth()
      const currentDay = now.getDate()
      const startMonth = startDate.getMonth()
      const startDay = startDate.getDate()

      const hasHadAnniversary =
        currentMonth > startMonth ||
        (currentMonth === startMonth && currentDay >= startDay)

      if (!hasHadAnniversary) years--

      setTimePassed({ years, days, hours, minutes, seconds })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [startDate])

  return timePassed
}