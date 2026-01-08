<!-- src/App.vue -->
<script setup>
import { RouterView } from 'vue-router'
import BottomNav from '@/components/layout/BottomNav.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="min-h-screen bg-gray-50 antialiased">
    <!-- You can add global layout wrapper here later (AppLayout component) -->
    <RouterView />
    <BottomNav v-if="authStore.isAuthenticated" />
  </div>
</template>

<style>
/* Optional: global overrides or custom utilities */
@layer base {
  html {
    @apply scroll-smooth;
  }
}
</style>