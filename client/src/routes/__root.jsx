import { Outlet } from '@tanstack/react-router'
import '../App.css'

export const Route = {
  component: RootLayout,
}

export function RootLayout() {
  return (
    <div className="root-layout">
      <Outlet />
    </div>
  )
}
