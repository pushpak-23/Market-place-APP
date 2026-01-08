<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['change'])

const filters = ref({
  location: '',
  quality: '',
  minPrice: '',
  maxPrice: ''
})

watch(filters, () => {
  emit('change', { ...filters.value })
}, { deep: true })
</script>

<template>
  <div class="bg-white p-3 rounded shadow mb-4 space-y-2">
    <input
      v-model="filters.location"
      placeholder="Location"
      class="w-full border px-3 py-2 rounded"
    />

    <select
      v-model="filters.quality"
      class="w-full border px-3 py-2 rounded"
    >
      <option value="">All Quality</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>

    <div class="flex gap-2">
      <input
        v-model="filters.minPrice"
        type="number"
        placeholder="Min ₹"
        class="w-1/2 border px-3 py-2 rounded"
      />
      <input
        v-model="filters.maxPrice"
        type="number"
        placeholder="Max ₹"
        class="w-1/2 border px-3 py-2 rounded"
      />
    </div>
  </div>
</template>
