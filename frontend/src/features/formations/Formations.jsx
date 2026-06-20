import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Layout'
import { Container } from '@/components/ui/Layout'
import { cn } from '@/lib/cn'
import { mockCourses } from '@/data/mockData'

const tags = ['Todos', 'Frontend', 'Cloud', 'Testing', 'Herramientas']

export default function Formations() {
  const [filter, setFilter] = useState('Todos')

  const filtered = filter === 'Todos' ? mockCourses : mockCourses.filter((c) => c.tag === filter)

  return (
    <Container className="pt-8 md:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="font-display text-3xl font-bold text-text-primary">Tu trayectoria</h1>
        <p className="mt-1 text-text-secondary">
          Cursos elegidos según el gap detectado en tu perfil.
        </p>
      </motion.div>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={cn(
              'whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
              filter === tag
                ? 'border-violet-soft/50 bg-violet/15 text-violet-soft'
                : 'border-border text-text-secondary hover:border-border-soft'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filtered.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card glow="violet">
              <div className="flex items-start justify-between">
                <div>
                  <Badge color={course.free ? 'mint' : 'amber'}>
                    {course.free ? 'Gratis' : 'Pago'}
                  </Badge>
                  <h3 className="mt-3 font-semibold text-text-primary">{course.title}</h3>
                  <p className="text-sm text-text-tertiary">{course.provider}</p>
                </div>
                {course.progress === 100 && (
                  <CheckCircle2 size={20} className="text-mint-soft" />
                )}
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-text-tertiary">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {course.duration}
                </span>
                <span>{course.level}</span>
              </div>

              {course.progress > 0 && (
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs text-text-tertiary">
                    <span>Progreso</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${course.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-mint"
                    />
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  )
}
