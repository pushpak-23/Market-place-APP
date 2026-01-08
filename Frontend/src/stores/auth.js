import { defineStore } from 'pinia'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'


const API_BASE = 'http://localhost:3000/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token')
  }),

  actions: {
   async signup(userData) {
  try {
    const res = await axios.post(`${API_BASE}/signup`, userData)
    this.setToken(res.data.token)
    return { success: true }
  } catch (err) {
    // ✅ HANDLE 409 EXPLICITLY
    if (err.response?.status === 409) {
      return {
        success: false,
        message: 'User already exists'
      }
    }

    return {
      success: false,
      message: err.response?.data?.message || 'Signup failed'
    }
  }
},


    async login(credentials) {
      const res = await axios.post(`${API_BASE}/login`, credentials)
      this.setToken(res.data.token)
      return { success: true }
    },

    setToken(token) {
      this.token = token
      this.isAuthenticated = true

      const decoded = jwtDecode(token)
      this.user = {
        id: decoded.userId,
        role: decoded.role
      }

      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },

    loadUserFromToken() {
      if (!this.token) return
      const decoded = jwtDecode(this.token)
      this.user = {
        id: decoded.userId,
        role: decoded.role
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    }
  }
})
