<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import InputField from '@/components/primitives/InputField.vue'
import Button from '@/components/primitives/Button.vue'
import CropImageUpload from './CropImageUpload.vue'

import { useAuthStore } from '@/stores/auth'
import { useCropsStore } from '@/stores/crops'

const router = useRouter()
const authStore = useAuthStore()
const cropsStore = useCropsStore()

const crop = ref({
  name: '',
  quantity: '',
  quality: '',
  price: '',
  location: ''
})

const images = ref([])

const onImagesUpdate = (files) => {
  images.value = Array.isArray(files) ? files : []
}

const submit = async () => {
  if (images.value.length === 0) {
    alert('Please add at least one image')
    return
  }

  const formData = new FormData()

  Object.entries(crop.value).forEach(([key, value]) => {
    formData.append(key, value)
  })

  images.value.forEach(file => {
    formData.append('images', file)
  })

  const res = await axios.post(
    'http://localhost:3000/api/crops',
    formData,
    {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    }
  )

  // 🔥 IMPORTANT: images come from backend response
  cropsStore.addCrop({
    id: res.data.cropId,
    name: crop.value.name,
    quantity: crop.value.quantity,
    quality: crop.value.quality,
    price: crop.value.price,
    location: crop.value.location,
    images: res.data.images // <-- THIS IS THE FIX
  })

  // reset form
  Object.keys(crop.value).forEach(k => (crop.value[k] = ''))
  images.value = []

  router.push('/farmer/my-crops')
}
</script>

<template>
  <form @submit.prevent="submit" class="space-y-4">
    <CropImageUpload @update:images="onImagesUpdate" />

    <InputField v-model="crop.name" label="Crop Name" />
    <InputField v-model="crop.quantity" label="Quantity" />
    <InputField v-model="crop.quality" label="Quality" />
    <InputField v-model="crop.price" label="Expected Price" type="number" />
    <InputField v-model="crop.location" label="Village / Location" />

    <Button type="submit">Upload Crop</Button>
  </form>
</template>
