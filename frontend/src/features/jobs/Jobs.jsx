import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, DollarSign, Check, X } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Layout'
import { Container } from '@/components/ui/Layout'
import { mockJobs } from '@/data/mockData'

function GapBar({ value, delay = 0 }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-bg-elevated">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full"
        style={{
          background:
            value >= 75
              ? 'linear-gradient(90deg, #25835B, #3DDC97)'
              : value >= 55
              ? 'linear-gradient(90deg, #4C3B99, #7C5CFC)'
              : 'linear-gradient(90deg, #99412C, #FF6B4A)',
        }}
      />
    </div>
  )
}

export default function Jobs() {
  const [selected, setSelected] = useState(null)

  return (
    <Container className="pt-8 md:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-bold text-text-primary">Vacantes para vos</h1>
        <p className="mt-1 text-text-secondary">
          Match calculado según tu perfil. El mercado ya cubre el resto.
        </p>
      </motion.div>

      <div className="space-y-4">
        {mockJobs
          .slice()
          .sort((a, b) => b.match - a.match)
          .map((job, i) => {
            const isExpanded = selected === job.id
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card
                  glow={job.match >= 75 ? 'mint' : job.match >= 55 ? 'violet' : 'coral'}
                  onClick={() => setSelected(isExpanded ? null : job.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <img src={job.logo} alt={job.company} className="h-12 w-12 rounded-xl object-cover" />
                      <div>
                        <h3 className="font-semibold text-text-primary">{job.title}</h3>
                        <p className="flex items-center gap-1 text-sm text-text-tertiary">
                          <Briefcase size={12} /> {job.company}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-text-tertiary">
                          <MapPin size={12} /> {job.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-2xl font-bold text-text-primary tabular-nums">
                        {job.match}%
                      </span>
                      <p className="text-xs text-text-tertiary">compatible</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <GapBar value={job.match} delay={i * 0.06} />
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-sm text-text-secondary">
                    <DollarSign size={14} className="text-mint-soft" />
                    {job.salary}
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-4 grid grid-cols-1 gap-4 border-t border-border-soft pt-4 sm:grid-cols-2"
                    >
                      <div>
                        <p className="mb-2 text-xs font-medium text-text-tertiary">Ya cumplís</p>
                        <div className="flex flex-wrap gap-1.5">
                          {job.have.map((skill) => (
                            <Badge key={skill} color="mint">
                              <Check size={10} /> {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-medium text-text-tertiary">Te falta</p>
                        <div className="flex flex-wrap gap-1.5">
                          {job.missing.map((skill) => (
                            <Badge key={skill} color="coral">
                              <X size={10} /> {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            )
          })}
      </div>
    </Container>
  )
}
