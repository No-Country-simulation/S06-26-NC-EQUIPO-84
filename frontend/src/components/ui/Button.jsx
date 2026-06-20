import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

const variants = {
  primary: 'bg-violet text-white shadow-[0_0_0_1px_rgba(124,92,252,0.4),0_0_30px_rgba(124,92,252,0.3)] hover:shadow-[0_0_0_1px_rgba(155,130,255,0.6),0_0_45px_rgba(124,92,252,0.5)]',
  coral: 'bg-coral text-white shadow-[0_0_0_1px_rgba(255,107,74,0.4),0_0_30px_rgba(255,107,74,0.3)] hover:shadow-[0_0_0_1px_rgba(255,138,107,0.6),0_0_45px_rgba(255,107,74,0.5)]',
  ghost: 'bg-white/5 text-text-primary border border-border hover:bg-white/10 hover:border-violet-soft/40',
  outline: 'bg-transparent text-text-primary border border-border hover:border-violet-soft/60 hover:bg-violet/5',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  magnetic = false,
  icon,
  iconPosition = 'right',
  ...props
}) {
  const handleMouseMove = (e) => {
    if (!magnetic) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`
  }

  const handleMouseLeave = (e) => {
    if (!magnetic) return
    e.currentTarget.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out will-change-transform cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </motion.button>
  )
}
