import { mockJobs, mockCourses, emotionActions } from '@/data/mockData'

const USE_MOCK = true
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * POST /orientar
 * Request: { usuario_id, perfil, nivel, region, idioma, lat, lng }
 * Response: { gap_porcentual, gap_items, trayectoria_sugerida, vacantes_compatibles, confianza }
 */
export async function getOrientacion(payload) {
  if (USE_MOCK) {
    await delay(900)
    const best = mockJobs.reduce((a, b) => (b.match > a.match ? b : a), mockJobs[0])
    return {
      gap_porcentual: best.match,
      gap_items: best.missing,
      trayectoria_sugerida: mockCourses.filter((c) => c.tag === 'Frontend'),
      vacantes_compatibles: mockJobs,
      confianza: 0.91,
    }
  }

  const res = await fetch(`${API_BASE}/orientar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Error al obtener orientación')
  return res.json()
}

/**
 * POST /salud
 * Request: { usuario_id, humor, nota_semanal, contexto }
 * Response: { mensaje, accion_sugerida, derivar_cvv, nota_actual, alerta }
 */
export async function postCheckIn(payload) {
  if (USE_MOCK) {
    await delay(700)
    const data = emotionActions[payload.humor] || emotionActions.tired
    const nota = payload.nota_semanal ?? 7
    return {
      mensaje: data.message,
      accion_sugerida: data.action,
      derivar_cvv: nota < 4,
      nota_actual: nota,
      alerta: nota < 4,
    }
  }

  const res = await fetch(`${API_BASE}/salud`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Error al registrar check-in')
  return res.json()
}

export async function getJobs() {
  if (USE_MOCK) {
    await delay(500)
    return mockJobs
  }
  const res = await fetch(`${API_BASE}/jobs`)
  return res.json()
}

export async function getCourses() {
  if (USE_MOCK) {
    await delay(500)
    return mockCourses
  }
  const res = await fetch(`${API_BASE}/courses`)
  return res.json()
}
