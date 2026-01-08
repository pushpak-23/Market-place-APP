<script setup>
import { onMounted } from 'vue'
import { useCropsStore } from '@/stores/crops'
import CropCard from '@/components/crops/CropCard.vue'

const cropsStore = useCropsStore()

// 🔥 FETCH DATA ON PAGE LOAD
onMounted(() => {
  cropsStore.fetchCrops()
})
</script>

<template>
  <div class="p-4 pb-20">
    <h1 class="text-2xl font-bold mb-4">Marketplace</h1>

    <p
      v-if="!cropsStore.crops.length && !cropsStore.loading"
      class="text-gray-500"
    >
      No crops available right now.
    </p>

    <p v-if="cropsStore.loading" class="text-gray-400">
      Loading crops...
    </p>

    <div
      v-if="!cropsStore.loading && cropsStore.crops.length"
      class="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      <CropCard
        v-for="crop in cropsStore.crops"
        :key="crop.id"
        :crop="crop"
      />
    </div>
  </div>
</template>
