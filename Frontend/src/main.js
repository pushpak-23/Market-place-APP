import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'
import './index.css'
import axios from 'axios'
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const authStore = useAuthStore()
authStore.loadUserFromToken()
if (authStore.token) {
  axios.defaults.headers.common.Authorization =
    `Bearer ${authStore.token}`

  authStore.loadUserFromToken()
}
app.use(router)
app.mount('#app')
