import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Flame, BookOpen, Users, TrendingUp } from 'lucide-react'
import { ProgressRing } from '@/components/ui/ProgressRing'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Layout'
import { Container } from '@/components/ui/Layout'
import { useUser } from '@/context/UserContext'
import { mockJobs, mockCourses, mockMentors } from '@/data/mockData'

const emojiOptions = ['😊', '😴', '😢', '😰', '😤']

export default function Home() {
  const navigate = useNavigate()
  const { user } = useUser()
  const bestJob = mockJobs.reduce((a, b) => (b.match > a.match ? b : a), mockJobs[0])
  const firstName = user.name?.split(' ')[0] || 'che'

  return (
    <Container className="pt-8 md:pt-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <p className="text-text-tertiary">Hola de nuevo,</p>
        <h1 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
          {firstName} 👋
        </h1>
      </motion.div>

      {/* Quick check-in strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Card hover={false} glow="coral" className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">¿Cómo estás hoy?</p>
            <p className="text-xs text-text-tertiary">Tu check-in toma 10 segundos</p>
          </div>
          <div className="flex gap-1">
            {emojiOptions.map((emoji) => (
              <motion.button
                key={emoji}
                whileHover={{ scale: 1.3, y: -4 }}
                whileTap={{ scale: 1.1 }}
                onClick={() => navigate('/mental-health')}
                className="text-2xl"
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* GAP card - el momento WOW */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2"
        >
          <Card hover={false} glow="violet" className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 60% 60% at 100% 0%, rgba(124,92,252,0.12) 0%, transparent 70%)',
              }}
            />
            <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <Badge color="violet" className="mb-3">
                  <TrendingUp size={12} />
                  Tu mejor match
                </Badge>
                <h2 className="font-display text-xl font-semibold text-text-primary">
                  {bestJob.title}
                </h2>
                <p className="text-sm text-text-tertiary">{bestJob.company} · {bestJob.location}</p>
                <p className="mt-3 text-sm text-text-secondary">
                  Cumplís el <span className="font-semibold text-violet-soft">{bestJob.match}%</span> de los requisitos.
                  Te falta: {bestJob.missing.slice(0, 2).join(', ')}.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  icon={<ArrowRight size={14} />}
                  onClick={() => navigate('/jobs')}
                >
                  Ver el plan completo
                </Button>
              </div>
              <ProgressRing value={bestJob.match} size={140} color="#7C5CFC" label="match" />
            </div>
          </Card>
        </motion.div>

        {/* Streak / racha */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card hover={false} glow="mint" className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-mint/10">
              <Flame size={24} className="text-mint-soft" />
            </div>
            <p className="font-display text-2xl font-bold text-text-primary">5 días</p>
            <p className="text-sm text-text-tertiary">de racha activa</p>
            <p className="mt-3 text-xs text-text-secondary">
              Volviste cada día esta semana. Eso ya es disciplina.
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Próximo curso + mentor disponible */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card glow="violet" onClick={() => navigate('/formations')} className="cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet/10">
                <BookOpen size={20} className="text-violet-soft" />
              </div>
              <div>
                <p className="text-xs text-text-tertiary">Próximo paso recomendado</p>
                <p className="font-semibold text-text-primary">{mockCourses[0].title}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-text-tertiary">
              <span>{mockCourses[0].provider} · {mockCourses[0].duration}</span>
              <Badge color="mint">Gratis</Badge>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card glow="coral" onClick={() => navigate('/mentors')} className="cursor-pointer">
            <div className="flex items-center gap-3">
              <img
                src={mockMentors[0].avatar}
                alt={mockMentors[0].name}
                className="h-11 w-11 rounded-xl object-cover"
              />
              <div>
                <p className="text-xs text-text-tertiary">Mentor disponible</p>
                <p className="font-semibold text-text-primary">{mockMentors[0].name}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-text-tertiary">
              <span>{mockMentors[0].role}</span>
              <span className="flex items-center gap-1 text-mint-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-mint-soft" /> Disponible
              </span>
            </div>
          </Card>
        </motion.div>
      </div>
    </Container>
  )
}
