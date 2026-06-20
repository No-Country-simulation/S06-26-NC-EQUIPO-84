import { forwardRef, useState } from 'react'
import { cn } from '@/lib/cn'

export const Input = forwardRef(function Input(
  { label, error, className, type = 'text', icon, ...props },
  ref
) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          onFocus={(e) => {
            setFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            props.onBlur?.(e)
          }}
          className={cn(
            'w-full rounded-xl bg-bg-elevated border border-border px-4 py-3.5 text-text-primary placeholder:text-text-tertiary transition-all duration-200 outline-none',
            'focus:border-violet-soft/60 focus:bg-surface focus:shadow-[0_0_0_3px_rgba(124,92,252,0.15)]',
            icon && 'pl-11',
            error && 'border-red-alert/60 focus:shadow-[0_0_0_3px_rgba(255,92,122,0.15)]',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-alert">{error}</p>
      )}
    </div>
  )
})

export function Select({ label, error, className, children, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full rounded-xl bg-bg-elevated border border-border px-4 py-3.5 text-text-primary transition-all duration-200 outline-none appearance-none cursor-pointer',
          'focus:border-violet-soft/60 focus:bg-surface focus:shadow-[0_0_0_3px_rgba(124,92,252,0.15)]',
          error && 'border-red-alert/60',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-sm text-red-alert">{error}</p>}
    </div>
  )
}
