import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { UserProvider } from '@/context/UserContext'
import { AppShell } from '@/components/layout/AppShell'
import { PageTransition } from '@/components/layout/PageTransition'

import Landing from '@/features/landing/Landing'
import Register from '@/features/auth/Register'
import Profile from '@/features/profile/Profile'
import Home from '@/features/home/Home'
import Jobs from '@/features/jobs/Jobs'
import Formations from '@/features/formations/Formations'
import MentalHealth from '@/features/mental-health/MentalHealth'
import Mentors from '@/features/mentors/Mentors'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Landing />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />
        <Route
          path="/profile"
          element={
            <PageTransition>
              <Profile />
            </PageTransition>
          }
        />
        <Route
          path="/home"
          element={
            <AppShell>
              <PageTransition>
                <Home />
              </PageTransition>
            </AppShell>
          }
        />
        <Route
          path="/jobs"
          element={
            <AppShell>
              <PageTransition>
                <Jobs />
              </PageTransition>
            </AppShell>
          }
        />
        <Route
          path="/formations"
          element={
            <AppShell>
              <PageTransition>
                <Formations />
              </PageTransition>
            </AppShell>
          }
        />
        <Route
          path="/mental-health"
          element={
            <AppShell>
              <PageTransition>
                <MentalHealth />
              </PageTransition>
            </AppShell>
          }
        />
        <Route
          path="/mentors"
          element={
            <AppShell>
              <PageTransition>
                <Mentors />
              </PageTransition>
            </AppShell>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <UserProvider>
      <AnimatedRoutes />
    </UserProvider>
  )
}
