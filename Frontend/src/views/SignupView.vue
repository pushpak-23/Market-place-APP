<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Button from "@/components/primitives/Button.vue";
import InputField from "@/components/primitives/InputField.vue";
import SelectDropdown from "@/components/primitives/SelectDropdown.vue";

const router = useRouter();
const authStore = useAuthStore();

const name = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const role = ref("BUYER"); // Default to Buyer
const village = ref("");
const loading = ref(false);
const error = ref("");

const roleOptions = [
  { value: "FARMER", label: "Farmer (Sell crops)" },
  { value: "BUYER", label: "Buyer" },
];

const signup = async () => {
  loading.value = true;
  error.value = "";
  try {
    await authStore.signup({
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      role: role.value,
      village: village.value,
    });
    router.push("/home");
  } catch (err) {
    error.value = err.response?.data?.message || "Signup failed";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg p-8">
    <h2 class="text-2xl font-semibold text-center mb-6">Create Account</h2>
    <form @submit.prevent="signup">
      <InputField v-model="name" label="Full Name" type="text" required />
      <InputField v-model="email" label="Email" type="email" />
      <InputField v-model="phone" label="Phone Number" type="tel" required />
      <InputField
        v-model="village"
        label="Village / Location"
        type="text"
        required
      />
      <SelectDropdown v-model="role" :options="roleOptions" label="I am a" />
      <InputField
        v-model="password"
        label="Password"
        type="password"
        required
      />
      <Button type="submit" :loading="loading" class="w-full mt-6">
        Sign Up
      </Button>
      <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
      <router-link
        to="/login"
        class="block text-center mt-6 text-green-600 hover:underline"
      >
        Already have an account? Login
      </router-link>
    </form>
  </div>
</template>
