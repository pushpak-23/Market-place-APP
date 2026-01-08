<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import InputField from '@/components/primitives/InputField.vue'
import Button from '@/components/primitives/Button.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const login = async () => {
  loading.value = true
  error.value = ''

  const result = await authStore.login({
    email: email.value,
    password: password.value
  })

  loading.value = false

  if (result.success) {
    router.push('/home')
  } else {
    error.value = result.message
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <h2 class="text-3xl font-bold text-center text-green-800 mb-8">
        Welcome Back
      </h2>

      <form @submit.prevent="login">
        <InputField
          v-model="email"
          label="Email"
          type="email"
          placeholder="your@email.com"
          required
        />

        <InputField
          v-model="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          required
        />

        <p v-if="error" class="text-red-600 text-center mb-4">
          {{ error }}
        </p>

        <!-- 🔴 THIS WAS THE ISSUE -->
        <Button type="submit" :loading="loading">
          Login
        </Button>
      </form>

      <p class="text-center mt-6 text-gray-600">
        Don't have an account?
        <router-link
          to="/signup"
          class="text-green-600 font-semibold hover:underline"
        >
          Sign up
        </router-link>
      </p>
    </div>
  </div>
</template>
