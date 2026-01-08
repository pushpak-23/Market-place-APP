<script setup>
import { onMounted, computed } from 'vue'
import { useCropsStore } from '@/stores/crops'
import { useAuthStore } from '@/stores/auth'

const cropsStore = useCropsStore()
const authStore = useAuthStore()

// 🔥 FETCH DATA ON PAGE LOAD
onMounted(() => {
  cropsStore.fetchCrops()
})

// OPTIONAL: show only logged-in farmer’s crops
const myCrops = computed(() =>
  cropsStore.crops.filter(
    crop => crop.farmer_id === authStore.user?.id
  )
)
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Crops</h1>

    <p v-if="!myCrops.length && !cropsStore.loading" class="text-gray-500">
      No crops uploaded yet.
    </p>

    <p v-if="cropsStore.loading" class="text-gray-400">
      Loading your crops...
    </p>

    <div
      v-if="!cropsStore.loading && myCrops.length"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div
        v-for="crop in myCrops"
        :key="crop.id"
        class="border rounded-lg p-3"
      >
        <img
          v-if="crop.images?.length"
          :src="crop.images[0]"
          class="h-40 w-full object-cover rounded"
        />

        <h3 class="font-semibold mt-2">{{ crop.name }}</h3>

        <p class="text-sm text-gray-600">
          {{ crop.quantity }} • {{ crop.location }}
        </p>

        <p class="text-green-700 font-bold">
          ₹{{ crop.price }}
        </p>
      </div>
    </div>
  </div>
</template>
