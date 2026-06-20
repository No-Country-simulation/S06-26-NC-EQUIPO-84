import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

export function ProgressRing({
  value = 70,
  size = 160,
  strokeWidth = 12,
  color = '#7C5CFC',
  trackColor = 'rgba(255,255,255,0.06)',
  label,
  sublabel,
  delay = 0,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState(0)

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (displayValue / 100) * circumference

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, value, delay])

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: isInView ? offset : circumference }}
          transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            filter: `drop-shadow(0 0 8px ${color}80)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold text-text-primary tabular-nums">
          {displayValue}%
        </span>
        {label && <span className="text-xs text-text-tertiary mt-0.5">{label}</span>}
      </div>
      {sublabel && (
        <span className="absolute -bottom-7 text-xs text-text-secondary whitespace-nowrap">
          {sublabel}
        </span>
      )}
    </div>
  )
}
