import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree'
import './App.css'

// Create a router instance
const router = createRouter({ routeTree })

export function App() {
  return <RouterProvider  router={router} />
}
