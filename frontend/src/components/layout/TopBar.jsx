import { NavLink, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Briefcase, GraduationCap, HeartPulse, Users } from 'lucide-react'

const navItems = [
  { to: '/home', icon: Home, label: 'Inicio' },
  { to: '/jobs', icon: Briefcase, label: 'Empleos' },
  { to: '/formations', icon: GraduationCap, label: 'Formaciones' },
  { to: '/mental-health', icon: HeartPulse, label: 'Bienestar' },
  { to: '/mentors', icon: Users, label: 'Mentores' },
]

export function TopBar() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 hidden md:block">
      <div className="glass border-b border-border-soft">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
          <Link to="/home" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet shadow-[0_0_20px_rgba(124,92,252,0.5)]">
              <span className="font-display text-sm font-bold text-white">B</span>
            </div>
            <span className="font-display text-lg font-semibold text-text-primary">
              App BiT
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="topBarActive"
                      className="absolute inset-0 rounded-full bg-violet/15"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={16}
                    className={`relative z-10 ${isActive ? 'text-violet-soft' : 'text-text-tertiary'}`}
                  />
                  <span className={`relative z-10 ${isActive ? 'text-violet-soft' : 'text-text-secondary'}`}>
                    {item.label}
                  </span>
                </NavLink>
              )
            })}
          </nav>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet to-coral text-sm font-semibold text-white">
            U
          </div>
        </div>
      </div>
    </header>
  )
}
