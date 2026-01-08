<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCropsStore } from '@/stores/crops'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const cropsStore = useCropsStore()
const authStore = useAuthStore()

const crop = ref(null)
const loading = ref(true)

onMounted(async () => {
  crop.value = await cropsStore.fetchCropById(route.params.id)
  loading.value = false
})

const isFarmer = authStore.user?.role === 'Farmer'
</script>

<template>
  <div class="p-4 pb-20">
    <p v-if="loading" class="text-gray-500">Loading crop...</p>

    <div v-else-if="crop">
      <!-- Images -->
      <div class="mb-4">
        <img
          v-for="(img, i) in crop.images"
          :key="i"
          :src="img"
          class="w-full h-56 object-cover rounded mb-2"
        />
      </div>

      <!-- Info -->
      <h1 class="text-2xl font-bold">{{ crop.name }}</h1>

      <p class="text-gray-600 mt-1">
        📍 {{ crop.location }}
      </p>

      <p class="mt-2">
        <strong>Quantity:</strong> {{ crop.quantity }}
      </p>

      <p>
        <strong>Quality:</strong> {{ crop.quality }}
      </p>

      <p class="text-green-700 font-bold text-xl mt-2">
        ₹{{ crop.price }}
      </p>

      <!-- Buyer Action -->
      <button
        v-if="!isFarmer"
        class="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
      >
        I’m Interested
      </button>

      <!-- Farmer Actions (future) -->
      <div v-if="isFarmer" class="mt-4 text-gray-500 text-sm">
        You are the seller of this crop.
      </div>
    </div>
  </div>
</template>
