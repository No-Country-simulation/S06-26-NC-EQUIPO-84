import { useState, useCallback } from 'react'
import { postCheckIn } from '@/services/api'
import { useUser } from '@/context/UserContext'

export function useMentalHealth() {
  const { user } = useUser()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submitCheckIn = useCallback(
    async (humor, notaSemanal = 7) => {
      setLoading(true)
      setError(null)
      try {
        const response = await postCheckIn({
          usuario_id: user.email || 'demo-user',
          humor,
          nota_semanal: notaSemanal,
          contexto: { area: user.area, goal: user.goal },
        })
        setResult(response)
        return response
      } catch (err) {
        setError(err.message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [user]
  )

  return { result, loading, error, submitCheckIn }
}
