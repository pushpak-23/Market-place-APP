<script setup>
import { onMounted } from 'vue'
import CropFilters from '@/components/crops/CropFilters.vue'
import CropCard from '@/components/crops/CropCard.vue'
import { useCropsStore } from '@/stores/crops'

const cropsStore = useCropsStore()

onMounted(() => {
  cropsStore.fetchCrops()
})

const applyFilters = (filters) => {
  cropsStore.fetchCrops(filters)
}
</script>

<template>
  <div class="p-4 pb-20">
    <h1 class="text-2xl font-bold mb-4">Marketplace</h1>

    <CropFilters @change="applyFilters" />

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <CropCard
        v-for="crop in cropsStore.crops"
        :key="crop.id"
        :crop="crop"
      />
    </div>
  </div>
</template>
