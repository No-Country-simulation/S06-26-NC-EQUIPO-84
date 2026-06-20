import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Briefcase, GraduationCap, Users, HeartPulse, Sparkles, Play } from 'lucide-react'
import { ParticleHero } from './ParticleHero'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Layout'
import { Container, Section } from '@/components/ui/Layout'
import { mockStories } from '@/data/mockData'

const services = [
  {
    icon: GraduationCap,
    title: 'Formaciones',
    desc: 'Cursos gratuitos y trayectorias personalizadas según tu gap real.',
    color: 'violet',
  },
  {
    icon: Briefcase,
    title: 'Empleabilidad',
    desc: 'Match automático con vacantes. Vemos qué te falta y cómo resolverlo.',
    color: 'coral',
  },
  {
    icon: Play,
    title: 'Experiencias',
    desc: 'Historias reales de personas que rompieron las mismas barreras.',
    color: 'mint',
  },
  {
    icon: Users,
    title: 'Mentorías',
    desc: 'Conexión humana con profesionales que te invitan a practicar, no solo a una entrevista.',
    color: 'violet',
  },
  {
    icon: HeartPulse,
    title: 'Salud mental',
    desc: 'Check-in diario. Te escuchamos sin juzgar — ese ya es el inicio.',
    color: 'coral',
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="relative overflow-x-hidden bg-bg">
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5">
        <ParticleHero />
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124,92,252,0.12) 0%, transparent 70%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mb-8"
        >
          <Badge color="violet">
            <Sparkles size={12} />
            Tu camino al mundo tech empieza acá
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-3xl text-center font-display text-4xl font-bold leading-[1.1] text-text-primary md:text-6xl"
        >
          No estás perdido.
          <br />
          <span className="text-gradient-violet">Solo estás sin mapa.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-6 max-w-xl text-center text-base text-text-secondary md:text-lg"
        >
          App BiT acompaña a personas como vos en formación, empleo, mentoría y
          bienestar emocional — todo en un solo lugar, sin juzgar tu punto de
          partida.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Button
            variant="primary"
            size="lg"
            magnetic
            icon={<ArrowRight size={18} />}
            onClick={() => navigate('/register')}
          >
            Empezar mi camino
          </Button>
          <Button variant="ghost" size="lg" onClick={() => navigate('/home')}>
            Ver demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs text-text-tertiary"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓ Descubrí cómo funciona
          </motion.div>
        </motion.div>
      </section>

      {/* ===== PROBLEMA ===== */}
      <Section className="border-t border-border-soft">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-display text-3xl font-semibold text-text-primary md:text-4xl">
              El mercado tech ya cubre el{' '}
              <span className="text-mint-soft">70%</span> de lo que necesitás.
            </h2>
            <p className="mt-4 text-text-secondary">
              Te mostramos exactamente qué falta — y te damos un plan concreto
              para cerrarlo. Sin vueltas, sin letra chica.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* ===== SERVICIOS ===== */}
      <Section className="border-t border-border-soft">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-2xl font-semibold text-text-primary md:text-3xl">
              Cinco dimensiones. Un solo ecosistema.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card glow={s.color} className="h-full">
                    <div
                      className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-${s.color}/10`}
                    >
                      <Icon size={20} className={`text-${s.color}-soft`} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-text-primary">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary">{s.desc}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ===== HISTORIAS ===== */}
      <Section className="border-t border-border-soft">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <h2 className="font-display text-2xl font-semibold text-text-primary md:text-3xl">
                Personas reales. Caminos reales.
              </h2>
              <p className="mt-2 text-text-secondary">
                Encontrá referencias de que sí es posible.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {mockStories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <Badge color="mint" className="mb-2">
                    {story.tag}
                  </Badge>
                  <p className="text-sm font-medium text-text-primary">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    {story.name} · {story.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== CTA FINAL ===== */}
      <Section className="border-t border-border-soft pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass relative overflow-hidden rounded-3xl px-8 py-16 text-center"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 50% 80% at 50% 0%, rgba(124,92,252,0.15) 0%, transparent 70%)',
              }}
            />
            <h2 className="relative font-display text-3xl font-bold text-text-primary md:text-4xl">
              Tu próximo paso empieza con un perfil.
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-text-secondary">
              Dos minutos. Sin compromiso. Con acompañamiento real desde el
              primer momento.
            </p>
            <div className="relative mt-8">
              <Button
                variant="primary"
                size="lg"
                magnetic
                icon={<ArrowRight size={18} />}
                onClick={() => navigate('/register')}
              >
                Crear mi cuenta
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
