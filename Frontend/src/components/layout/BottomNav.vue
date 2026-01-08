<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isFarmer = authStore.user?.role === 'Farmer'

const goHome = () => {
  router.push(isFarmer ? '/farmer' : '/marketplace')
}

const logout = () => {
  authStore.logout()
  router.replace('/login')
}

const openUpload = () => {
  router.push('/farmer/add-crop')
}
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50"
  >
    <div class="relative flex justify-around items-center h-16">

      <!-- Home -->
      <button class="flex flex-col items-center text-gray-600" @click="goHome">
        <span class="text-xl">🏠</span>
        <span class="text-xs">Home</span>
      </button>

      <!-- Market / Dashboard -->
      <button class="flex flex-col items-center text-gray-600" @click="goHome">
        <span class="text-xl">🛒</span>
        <span class="text-xs">
          {{ isFarmer ? 'Dashboard' : 'Market' }}
        </span>
      </button>

      <!-- FARMER ONLY CAMERA BUTTON -->
      <button
        v-if="isFarmer"
        class="absolute -top-6 bg-green-600 text-white rounded-full h-14 w-14 flex items-center justify-center shadow-xl"
        @click="openUpload"
      >
        <span class="text-2xl">📷</span>
      </button>

      <!-- Profile (future) -->
      <button class="flex flex-col items-center text-gray-600">
        <span class="text-xl">👤</span>
        <span class="text-xs">Profile</span>
      </button>

      <!-- Logout -->
      <button class="flex flex-col items-center text-red-500" @click="logout">
        <span class="text-xl">🚪</span>
        <span class="text-xs">Logout</span>
      </button>
    </div>
  </nav>
</template>
