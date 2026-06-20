import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Briefcase, GraduationCap, HeartPulse, Users } from 'lucide-react'

const navItems = [
  { to: '/home', icon: Home, label: 'Inicio' },
  { to: '/jobs', icon: Briefcase, label: 'Empleos' },
  { to: '/mental-health', icon: HeartPulse, label: 'Bienestar' },
  { to: '/formations', icon: GraduationCap, label: 'Cursos' },
  { to: '/mentors', icon: Users, label: 'Mentores' },
]

export function BottomBar() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="glass mx-3 mb-3 rounded-2xl px-2 py-2">
        <div className="flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="relative flex flex-1 flex-col items-center gap-1 rounded-xl py-2 transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="bottomBarActive"
                    className="absolute inset-0 rounded-xl bg-violet/15"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={20}
                  strokeWidth={2}
                  className={`relative z-10 transition-colors ${
                    isActive ? 'text-violet-soft' : 'text-text-tertiary'
                  }`}
                />
                <span
                  className={`relative z-10 text-[10px] font-medium transition-colors ${
                    isActive ? 'text-violet-soft' : 'text-text-tertiary'
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
