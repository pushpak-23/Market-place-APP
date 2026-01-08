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
const role = ref('Buyer')
const location = ref('')
const loading = ref(false)
const error = ref('')

const roles = [
  { value: 'Farmer', label: 'Farmer (Sell crops)' },
  { value: 'Buyer', label: 'Buyer (Purchase crops)' }
]

const signup = async () => {
  loading.value = true
  error.value = ''

  try {
    const result = await authStore.signup({
      email: email.value,
      password: password.value,
      role: role.value,
      location: location.value || null
    })

    if (result.success) {
      router.push('/home')
    } else {
      error.value = result.message
    }
  } catch (e) {
    error.value = 'Something went wrong'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <h2 class="text-3xl font-bold text-center text-green-800 mb-8">
        Create Account
      </h2>

      <form @submit.prevent="signup">
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

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            I am a
          </label>
          <select
            v-model="role"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option
              v-for="r in roles"
              :key="r.value"
              :value="r.value"
            >
              {{ r.label }}
            </option>
          </select>
        </div>

        <InputField
          v-model="location"
          label="Village / Location (Optional)"
          placeholder="Village XYZ"
        />

        <p v-if="error" class="text-red-600 text-center mb-4">
          {{ error }}
        </p>

        <!-- IMPORTANT: type="submit" -->
        <Button type="submit" :loading="loading">
          Sign Up
        </Button>
      </form>

      <p class="text-center mt-6 text-gray-600">
        Already have an account?
        <router-link
          to="/login"
          class="text-green-600 font-semibold hover:underline"
        >
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>
