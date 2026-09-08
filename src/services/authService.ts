import api from '@/lib/api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  displayName: string
  isActive: boolean
  mfaEnabled: boolean
  permissions: string[]
  [key: string]: unknown
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  accessTokenExpiresAtUtc: string
  user: AuthUser
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials)
    const data = response.data
    //console.log(response.data);

    // Persist tokens and user info
    if (data.accessToken) {
      localStorage.setItem('auth_token', data.accessToken)
    }
    if (data.refreshToken) {
      localStorage.setItem('refresh_token', data.refreshToken)
    }
    if (data.accessTokenExpiresAtUtc) {
      localStorage.setItem('auth_token_expiry', data.accessTokenExpiresAtUtc)
    }
    if (data.user) {
      localStorage.setItem('auth_user', JSON.stringify(data.user))
    }

    return data
  },

  logout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('auth_token_expiry')
    localStorage.removeItem('auth_user')
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token')
  },

  getUser(): AuthUser | null {
    const raw = localStorage.getItem('auth_user')
    if (!raw) return null
    try {
      return JSON.parse(raw) as AuthUser
    } catch {
      return null
    }
  },

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token')
    const expiry = localStorage.getItem('auth_token_expiry')

    if (!token) return false

    // Check expiry if available
    if (expiry) {
      const expiryDate = new Date(expiry)
      if (expiryDate <= new Date()) {
        // Token has expired
        this.logout()
        return false
      }
    }

    return true
  },

  hasPermission(permission: string): boolean {
    const user = this.getUser()
    if (!user || !user.permissions) return false
    return user.permissions.includes(permission)
  }
}
