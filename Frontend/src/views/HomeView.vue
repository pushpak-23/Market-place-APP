<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

if (authStore.user?.role === 'Farmer') {
  router.replace('/farmer')
} else {
  router.replace('/marketplace')
}
</script>

<template>
  <div class="p-8 text-center">Redirecting...</div>
</template>
