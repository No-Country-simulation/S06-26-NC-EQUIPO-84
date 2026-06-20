import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, User, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { useUser } from '@/context/UserContext'

export default function Register() {
  const navigate = useNavigate()
  const { user, updateUser } = useUser()
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (e) => {
    updateUser({ [field]: e.target.value })
    setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!user.name) newErrors.name = 'Contanos tu nombre'
    if (!user.email) newErrors.email = 'Necesitamos tu email'
    if (!user.country) newErrors.country = 'Elegí tu país'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    navigate('/profile')
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-5 py-12">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,92,252,0.1) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Progress indicator */}
        <div className="mb-8 flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-violet" />
          <div className="h-1.5 flex-1 rounded-full bg-border" />
        </div>

        <div className="mb-8">
          <span className="text-sm font-medium text-violet-soft">Paso 1 de 2</span>
          <h1 className="mt-2 font-display text-3xl font-bold text-text-primary">
            Contanos quién sos
          </h1>
          <p className="mt-2 text-text-secondary">
            Esta info nos ayuda a personalizar tu camino desde el día uno.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre completo"
            placeholder="María García"
            icon={<User size={18} />}
            value={user.name}
            onChange={handleChange('name')}
            error={errors.name}
          />
          <Input
            label="Email"
            type="email"
            placeholder="maria@ejemplo.com"
            icon={<Mail size={18} />}
            value={user.email}
            onChange={handleChange('email')}
            error={errors.email}
          />
          <Input
            label="WhatsApp"
            type="tel"
            placeholder="+57 300 000 0000"
            icon={<Phone size={18} />}
            value={user.whatsapp}
            onChange={handleChange('whatsapp')}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Fecha de nacimiento"
              type="date"
              value={user.birthDate}
              onChange={handleChange('birthDate')}
            />
            <Select
              label="Género"
              value={user.gender}
              onChange={handleChange('gender')}
            >
              <option value="">Elegir</option>
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
              <option value="no-binario">No binario</option>
              <option value="prefiero-no-decir">Prefiero no decir</option>
            </Select>
          </div>

          <Select
            label="Escolaridad"
            value={user.education}
            onChange={handleChange('education')}
          >
            <option value="">Elegir nivel</option>
            <option value="secundaria">Secundaria completa</option>
            <option value="universitario">Universitario en curso</option>
            <option value="graduado">Graduado</option>
            <option value="posgrado">Posgrado</option>
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="País"
              value={user.country}
              onChange={handleChange('country')}
              error={errors.country}
            >
              <option value="">Elegir país</option>
              <option value="colombia">Colombia</option>
              <option value="brasil">Brasil</option>
              <option value="angola">Angola</option>
              <option value="mexico">México</option>
              <option value="argentina">Argentina</option>
            </Select>
            <Input
              label="Ciudad"
              placeholder="Medellín"
              icon={<MapPin size={18} />}
              value={user.city}
              onChange={handleChange('city')}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-4 w-full"
            icon={<ArrowRight size={18} />}
          >
            Continuar
          </Button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex w-full items-center justify-center gap-1.5 py-2 text-sm text-text-tertiary transition-colors hover:text-text-secondary"
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </button>
        </form>
      </motion.div>
    </div>
  )
}
