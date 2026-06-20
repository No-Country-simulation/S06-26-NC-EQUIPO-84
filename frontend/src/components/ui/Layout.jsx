import { cn } from '@/lib/cn'

export function Container({ children, className }) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-5 md:px-8', className)}>
      {children}
    </div>
  )
}

export function Section({ children, className, id }) {
  return (
    <section id={id} className={cn('relative py-16 md:py-24', className)}>
      {children}
    </section>
  )
}

export function Badge({ children, color = 'violet', className }) {
  const colorMap = {
    violet: 'bg-violet/10 text-violet-soft border-violet/20',
    coral: 'bg-coral/10 text-coral-soft border-coral/20',
    mint: 'bg-mint/10 text-mint-soft border-mint/20',
    amber: 'bg-amber/10 text-amber border-amber/20',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        colorMap[color],
        className
      )}
    >
      {children}
    </span>
  )
}
