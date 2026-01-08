<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const crops = ref([])
const selectedCrop = ref(null)
const buyers = ref([])

onMounted(async () => {
  const res = await axios.get(
    'http://localhost:3000/api/interests/farmer',
    {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    }
  )
  crops.value = res.data
})

const loadBuyers = async (cropId) => {
  selectedCrop.value = cropId
  const res = await axios.get(
    `http://localhost:3000/api/interests/crop/${cropId}`,
    {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    }
  )
  buyers.value = res.data
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Interested Buyers</h1>

    <!-- CROPS LIST -->
    <div class="space-y-3">
      <div
        v-for="crop in crops"
        :key="crop.crop_id"
        class="border p-3 rounded cursor-pointer hover:bg-gray-50"
        @click="loadBuyers(crop.crop_id)"
      >
        <strong>{{ crop.crop_name }}</strong>
        <p class="text-sm text-gray-600">
          ❤️ {{ crop.interest_count }} buyers interested
        </p>
      </div>
    </div>

    <!-- BUYERS LIST -->
    <div v-if="buyers.length" class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Buyers</h2>

      <div
        v-for="b in buyers"
        :key="b.id"
        class="border rounded p-3 mb-2"
      >
        <p><strong>Email:</strong> {{ b.email }}</p>

        <p v-if="b.phone">
          <strong>Phone:</strong>
          <a
            :href="`tel:${b.phone}`"
            class="text-green-600"
          >
            {{ b.phone }}
          </a>
        </p>

        <!-- WHATSAPP -->
        <a
          v-if="b.phone"
          :href="`https://wa.me/${b.phone}`"
          target="_blank"
          class="inline-block mt-2 text-white bg-green-600 px-3 py-1 rounded"
        >
          WhatsApp
        </a>
      </div>
    </div>
  </div>
</template>
