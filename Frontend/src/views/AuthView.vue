<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const isLogin = route.path === "/login";
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-green-800">AgriMarket</h1>
        <p class="text-gray-600 mt-2">
          {{ isLogin ? "Welcome back!" : "Join as Farmer or Buyer" }}
        </p>
      </div>
      <router-view />
    </div>
  </div>
</template>
