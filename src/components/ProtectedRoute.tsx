import { Navigate, Outlet } from 'react-router-dom'
import { authService } from '@/services/authService'

/**
 * Wraps protected routes — redirects to /login if the user is not authenticated.
 */
export default function ProtectedRoute() {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
