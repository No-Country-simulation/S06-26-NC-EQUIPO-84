import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Input'
import { useUser } from '@/context/UserContext'

const goals = [
  { value: 'estudiar', label: 'Estudiar', desc: 'Quiero aprender desde cero' },
  { value: 'definir-camino', label: 'Definir mi camino', desc: 'No sé bien por dónde empezar' },
  { value: 'buscar-empleo', label: 'Buscar empleo', desc: 'Ya tengo skills, necesito oportunidad' },
  { value: 'cambiar-empleo', label: 'Cambiar de empleo', desc: 'Quiero dar un salto en mi carrera' },
]

export default function Profile() {
  const navigate = useNavigate()
  const { user, updateUser, completeOnboarding } = useUser()

  const handleSubmit = (e) => {
    e.preventDefault()
    completeOnboarding()
    navigate('/home')
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-5 py-12">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,107,74,0.08) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-violet" />
          <div className="h-1.5 flex-1 rounded-full bg-violet" />
        </div>

        <div className="mb-8">
          <span className="text-sm font-medium text-coral-soft">Paso 2 de 2</span>
          <h1 className="mt-2 font-display text-3xl font-bold text-text-primary">
            Tu perfil profesional
          </h1>
          <p className="mt-2 text-text-secondary">
            Con esto cruzamos tu gap real con las oportunidades disponibles.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Select
            label="Nivel de experiencia"
            value={user.level}
            onChange={(e) => updateUser({ level: e.target.value })}
          >
            <option value="">Elegir nivel</option>
            <option value="sin-experiencia">Sin experiencia</option>
            <option value="junior">Junior</option>
            <option value="intermedio">Intermedio</option>
            <option value="senior">Senior</option>
          </Select>

          <Select
            label="Área de tecnología"
            value={user.area}
            onChange={(e) => updateUser({ area: e.target.value })}
          >
            <option value="">Elegir área</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Fullstack</option>
            <option value="data">Data / IA</option>
            <option value="diseno">Diseño UX/UI</option>
            <option value="qa">QA / Testing</option>
          </Select>

          <div>
            <label className="mb-3 block text-sm font-medium text-text-secondary">
              ¿Qué estás buscando?
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {goals.map((goal) => {
                const isSelected = user.goal === goal.value
                return (
                  <motion.button
                    key={goal.value}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => updateUser({ goal: goal.value })}
                    className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-violet-soft/60 bg-violet/10 shadow-[0_0_0_1px_rgba(124,92,252,0.3),0_0_24px_rgba(124,92,252,0.2)]'
                        : 'border-border bg-bg-elevated hover:border-border-soft hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-semibold ${
                          isSelected ? 'text-violet-soft' : 'text-text-primary'
                        }`}
                      >
                        {goal.label}
                      </span>
                      {isSelected && <Sparkles size={14} className="text-violet-soft" />}
                    </div>
                    <p className="mt-1 text-xs text-text-tertiary">{goal.desc}</p>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-4 w-full"
            icon={<ArrowRight size={18} />}
            disabled={!user.level || !user.area || !user.goal}
          >
            Ver mi camino
          </Button>

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="flex w-full items-center justify-center gap-1.5 py-2 text-sm text-text-tertiary transition-colors hover:text-text-secondary"
          >
            <ArrowLeft size={14} />
            Volver
          </button>
        </form>
      </motion.div>
    </div>
  )
}
