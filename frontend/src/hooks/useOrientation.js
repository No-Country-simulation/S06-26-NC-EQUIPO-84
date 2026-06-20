import { useState, useCallback } from 'react'
import { getOrientacion } from '@/services/api'
import { useUser } from '@/context/UserContext'

export function useOrientation() {
  const { user } = useUser()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchOrientation = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await getOrientacion({
        usuario_id: user.email || 'demo-user',
        perfil: { level: user.level, area: user.area, goal: user.goal },
        nivel: user.level,
        region: user.country,
        idioma: 'es',
      })
      setData(result)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [user])

  return { data, loading, error, fetchOrientation }
}
