import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Layout'
import { Container } from '@/components/ui/Layout'
import { mockMentors } from '@/data/mockData'

export default function Mentors() {
  return (
    <Container className="pt-8 md:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-bold text-text-primary">Red de mentores</h1>
        <p className="mt-1 text-text-secondary">
          No es solo una entrevista. Es una invitación a practicar con alguien que ya lo logró.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {mockMentors.map((mentor, i) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card glow="violet" className="h-full">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="h-14 w-14 rounded-2xl object-cover"
                  />
                  {mentor.available && (
                    <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-surface bg-mint-soft" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{mentor.name}</h3>
                  <p className="text-xs text-text-tertiary">{mentor.role}</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-text-secondary">{mentor.bio}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {mentor.tags.map((tag) => (
                  <Badge key={tag} color="violet">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button
                variant={mentor.available ? 'outline' : 'ghost'}
                size="sm"
                className="mt-5 w-full"
                icon={<MessageCircle size={14} />}
                disabled={!mentor.available}
              >
                {mentor.available ? '¿Quieres venir a una práctica?' : 'No disponible ahora'}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  )
}
