import { createContext, useContext, useState, useCallback } from 'react'

const UserContext = createContext(null)

const STORAGE_KEY = 'appbit_user'

function loadInitial() {
  return {
    isAuthenticated: false,
    name: '',
    email: '',
    birthDate: '',
    gender: '',
    education: '',
    continent: '',
    country: '',
    state: '',
    city: '',
    whatsapp: '',
    level: '',
    area: '',
    goal: '',
    onboardingStep: 0,
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(loadInitial)

  const updateUser = useCallback((fields) => {
    setUser((prev) => ({ ...prev, ...fields }))
  }, [])

  const completeOnboarding = useCallback(() => {
    setUser((prev) => ({ ...prev, isAuthenticated: true }))
  }, [])

  const resetUser = useCallback(() => {
    setUser(loadInitial())
  }, [])

  return (
    <UserContext.Provider value={{ user, updateUser, completeOnboarding, resetUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser debe usarse dentro de UserProvider')
  return ctx
}
