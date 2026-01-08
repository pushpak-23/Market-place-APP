<script setup>
import { ref, onBeforeUnmount } from 'vue'

const emit = defineEmits(['update:images'])

const previews = ref([])

const pickImages = (e) => {
  const files = Array.from(e.target.files)

  // cleanup old previews
  previews.value.forEach(url => URL.revokeObjectURL(url))
  previews.value = files.map(f => URL.createObjectURL(f))

  // emit ONLY plain array of File objects
  emit('update:images', files)
}

onBeforeUnmount(() => {
  previews.value.forEach(url => URL.revokeObjectURL(url))
})
</script>

<template>
  <div class="mb-4">
    <label class="block text-sm font-medium mb-2">
      Crop Images
    </label>

    <input
      id="cameraInput"
      type="file"
      accept="image/*"
      capture="environment"
      multiple
      class="hidden"
      @change="pickImages"
    />

    <label
      for="cameraInput"
      class="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg py-6 cursor-pointer text-green-700"
    >
      📷 Open Camera / Gallery
    </label>

    <div v-if="previews.length" class="grid grid-cols-3 gap-2 mt-3">
      <img
        v-for="(src, i) in previews"
        :key="i"
        :src="src"
        class="h-24 w-full object-cover rounded"
      />
    </div>
  </div>
</template>
