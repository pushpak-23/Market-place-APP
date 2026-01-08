<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  crop: {
    type: Object,
    required: true
  }
})

const openDetails = () => {
  router.push(`/crops/${props.crop.id}`)
}
</script>

<template>
  <div
    class="border rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
    @click="openDetails"
  >
    <img
      v-if="crop.images?.length"
      :src="crop.images[0]"
      class="h-36 w-full object-cover"
    />

    <div class="p-3">
      <h3 class="font-semibold text-lg">{{ crop.name }}</h3>

      <p class="text-sm text-gray-600">
        {{ crop.location }} • Quality {{ crop.quality }}
      </p>

      <p class="font-bold text-green-700 mt-1">
        ₹{{ crop.price }}
      </p>
    </div>
  </div>
</template>
