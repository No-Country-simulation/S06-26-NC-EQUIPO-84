import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Phone, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Layout'
import { useMentalHealth } from '@/hooks/useMentalHealth'
import { emotionMap } from '@/lib/tokens'

const emotions = [
  { key: 'happy', emoji: '😊' },
  { key: 'tired', emoji: '😴' },
  { key: 'sad', emoji: '😢' },
  { key: 'anxious', emoji: '😰' },
  { key: 'overwhelmed', emoji: '😤' },
]

export default function MentalHealth() {
  const [selected, setSelected] = useState(null)
  const [crisisScore, setCrisisScore] = useState(null)
  const { result, loading, submitCheckIn } = useMentalHealth()

  const activeEmotion = selected ? emotionMap[selected] : null

  const handleSelect = async (key) => {
    setSelected(key)
    const isLowMood = key === 'sad' || key === 'overwhelmed'
    const nota = isLowMood ? 3 : 7
    setCrisisScore(nota)
    await submitCheckIn(key, nota)
  }

  const handleReset = () => {
    setSelected(null)
    setCrisisScore(null)
  }

  return (
    <div
      className="relative min-h-[calc(100vh-80px)] transition-all duration-700"
      style={{
        background: activeEmotion ? activeEmotion.bg : 'transparent',
      }}
    >
      <Container className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center pt-8 text-center md:pt-12">
        <AnimatePresence mode="wait">
          {!selected && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-3 flex justify-center">
                <Heart size={28} className="text-coral-soft" />
              </div>
              <h1 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
                ¿Cómo estás hoy?
              </h1>
              <p className="mt-3 text-text-secondary">
                Tu respuesta queda solo entre vos y la app.
              </p>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
                {emotions.map((e, i) => (
                  <motion.button
                    key={e.key}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.25, y: -8 }}
                    whileTap={{ scale: 1.05 }}
                    onClick={() => handleSelect(e.key)}
                    className="text-5xl drop-shadow-lg"
                  >
                    {e.emoji}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {selected && loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-7xl"
              >
                {activeEmotion.emoji}
              </motion.div>
              <p className="mt-6 flex items-center gap-2 text-text-secondary">
                <Loader2 size={16} className="animate-spin" />
                Escuchando lo que sentís...
              </p>
            </motion.div>
          )}

          {selected && !loading && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6 text-6xl"
              >
                {activeEmotion.emoji}
              </motion.div>

              <Card hover={false} className="glass text-left">
                <p className="font-display text-lg font-semibold text-text-primary">
                  {result.mensaje}
                </p>
                <div className="mt-4 rounded-xl bg-bg-elevated p-4">
                  <p className="text-xs font-medium text-text-tertiary">Te sugerimos</p>
                  <p className="mt-1 text-sm text-text-secondary">{result.accion_sugerida}</p>
                </div>

                {result.alerta && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="mt-4 rounded-xl border border-red-alert/30 bg-red-alert/10 p-4"
                  >
                    <p className="text-sm font-medium text-red-alert">
                      Notamos que la estás pasando difícil.
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      No estás solo/a. Hay personas listas para escucharte ahora mismo.
                    </p>
                    <Button
                      variant="coral"
                      size="sm"
                      className="mt-3 w-full"
                      icon={<Phone size={14} />}
                    >
                      Hablar con CVV ahora
                    </Button>
                  </motion.div>
                )}

                <button
                  onClick={handleReset}
                  className="mt-5 w-full text-center text-sm text-text-tertiary transition-colors hover:text-text-secondary"
                >
                  Hacer otro check-in
                </button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  )
}
