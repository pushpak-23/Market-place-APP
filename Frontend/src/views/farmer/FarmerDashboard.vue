<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-green-800 mb-4">
      Farmer Dashboard
    </h1>

    <div class="space-y-4">
      <button
        class="w-full bg-green-600 text-white py-3 rounded-lg"
        @click="router.push('/farmer/add-crop')"
      >
        ➕ Add New Crop
      </button>

      <button
        class="w-full bg-gray-200 py-3 rounded-lg"
        @click="router.push('/farmer/my-crops')"
      >
        📦 My Crops
      </button>
    </div>
  </div>
</template>
