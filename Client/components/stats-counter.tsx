"use client"

import { useEffect, useState, useRef } from "react"

interface StatsCounterProps {
  number: number
  label: string
}

export default function StatsCounter({ number, label }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true

          const start = 0
          const duration = 2000
          const startTime = performance.now()

          const updateCount = (currentTime: number) => {
            const elapsedTime = currentTime - startTime
            const progress = Math.min(elapsedTime / duration, 1)

            // Easing function for smoother animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)

            setCount(Math.floor(easeOutQuart * number))

            if (progress < 1) {
              requestAnimationFrame(updateCount)
            }
          }

          requestAnimationFrame(updateCount)
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [number])

  return (
    <div className="text-center" ref={countRef}>
      <div className="text-4xl font-bold text-primary mb-2">{count.toLocaleString()}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  )
}

