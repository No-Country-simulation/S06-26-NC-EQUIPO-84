import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

export function Card({
  children,
  className,
  hover = true,
  glow,
  as: Component = motion.div,
  ...props
}) {
  const glowClass = {
    violet: 'hover:shadow-[0_0_0_1px_rgba(124,92,252,0.3),0_16px_48px_rgba(124,92,252,0.15)]',
    coral: 'hover:shadow-[0_0_0_1px_rgba(255,107,74,0.3),0_16px_48px_rgba(255,107,74,0.15)]',
    mint: 'hover:shadow-[0_0_0_1px_rgba(61,220,151,0.3),0_16px_48px_rgba(61,220,151,0.15)]',
  }[glow] || 'hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]'

  return (
    <Component
      className={cn(
        'relative rounded-2xl bg-surface border border-border-soft p-6 shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300',
        hover && 'hover:-translate-y-1 hover:border-border',
        hover && glowClass,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function GlassCard({ children, className, ...props }) {
  return (
    <div className={cn('glass rounded-2xl p-6', className)} {...props}>
      {children}
    </div>
  )
}
