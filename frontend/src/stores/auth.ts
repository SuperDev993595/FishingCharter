import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ApiService } from '@/services/api'

export interface User {
  id: number
  name: string
  email: string
  role: 'angler' | 'operator' | 'crew' | 'admin'
  phone?: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  is_verified: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAngler = computed(() => user.value?.role === 'angler')
  const isOperator = computed(() => user.value?.role === 'operator')
  const isCrew = computed(() => user.value?.role === 'crew')
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Actions
  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await ApiService.login(credentials)
      const { user: userData, token: authToken } = response.data
      
      user.value = userData
      token.value = authToken
      
      localStorage.setItem('auth_token', authToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      return userData
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
    password_confirmation: string
    role: 'angler' | 'operator' | 'crew'
    phone?: string
    location?: string
  }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await ApiService.register(userData)
      const { user: newUser, token: authToken } = response.data
      
      user.value = newUser
      token.value = authToken
      
      localStorage.setItem('auth_token', authToken)
      localStorage.setItem('user', JSON.stringify(newUser))
      
      return newUser
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    
    try {
      if (token.value) {
        await ApiService.logout()
      }
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      // Clear state regardless of API call success
      user.value = null
      token.value = null
      error.value = null
      
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      
      loading.value = false
    }
  }

  const updateProfile = async (profileData: Partial<User>) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await ApiService.updateProfile(profileData)
      const updatedUser = response.data.user
      
      user.value = updatedUser
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      return updatedUser
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Profile update failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async () => {
    if (!token.value) return null
    
    loading.value = true
    error.value = null
    
    try {
      const response = await ApiService.getUser()
      const userData = response.data
      
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
      
      return userData
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch user'
      // If user fetch fails, clear auth state
      await logout()
      throw err
    } finally {
      loading.value = false
    }
  }

  const initializeAuth = async () => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
      
      // Verify token is still valid
      try {
        await fetchUser()
      } catch (err) {
        // Token is invalid, clear auth state
        await logout()
      }
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    isAngler,
    isOperator,
    isCrew,
    isAdmin,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    fetchUser,
    initializeAuth,
    clearError,
  }
})
