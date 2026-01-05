<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Button from "@/components/primitives/Button.vue";
import InputField from "@/components/primitives/InputField.vue";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const login = async () => {
  loading.value = true;
  error.value = "";
  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push("/home");
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg p-8">
    <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
    <form @submit.prevent="login">
      <InputField v-model="email" label="Email or Phone" type="text" required />
      <InputField
        v-model="password"
        label="Password"
        type="password"
        required
      />
      <Button type="submit" :loading="loading" class="w-full mt-6">
        Login
      </Button>
      <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
      <router-link
        to="/signup"
        class="block text-center mt-6 text-green-600 hover:underline"
      >
        Don't have an account? Sign up
      </router-link>
    </form>
  </div>
</template>
