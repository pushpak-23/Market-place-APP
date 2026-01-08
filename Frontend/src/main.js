import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// ✅ IMPORTANT: access store AFTER pinia is installed
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

// Restore auth on refresh
if (authStore.token) {
  axios.defaults.headers.common.Authorization =
    `Bearer ${authStore.token}`
  authStore.loadUserFromToken()
}

app.use(router)
app.mount('#app')
