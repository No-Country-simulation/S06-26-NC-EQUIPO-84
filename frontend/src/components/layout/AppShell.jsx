import { TopBar } from './TopBar'
import { BottomBar } from './BottomBar'

export function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-bg">
      <TopBar />
      <main className="pb-24 md:pb-12">{children}</main>
      <BottomBar />
    </div>
  )
}
