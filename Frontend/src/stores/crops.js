import { defineStore } from 'pinia'
import axios from 'axios'

export const useCropsStore = defineStore('crops', {
  state: () => ({
    crops: [],
    loading: false,
    selectedCrop: null
  }),

  actions: {
    // ✅ FETCH CROPS WITH OPTIONAL FILTERS
    async fetchCrops(filters = {}) {
      this.loading = true
      try {
        const res = await axios.get(
          'http://localhost:3000/api/crops',
          { params: filters }
        )
        this.crops = res.data
      } catch (err) {
        console.error('Failed to load crops', err)
      } finally {
        this.loading = false
      }
    },

    // ✅ FETCH SINGLE CROP (DETAIL PAGE)
    async fetchCropById(id) {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/crops/${id}`
        )
        this.selectedCrop = res.data
        return res.data
      } catch (err) {
        console.error('Failed to load crop', err)
        return null
      }
    },

    // ✅ OPTIMISTIC ADD (AFTER UPLOAD)
    addCrop(crop) {
      this.crops.unshift(crop)
    },

    // 🔜 FUTURE (EDIT / DELETE)
    updateCrop(updatedCrop) {
      const index = this.crops.findIndex(c => c.id === updatedCrop.id)
      if (index !== -1) {
        this.crops[index] = updatedCrop
      }
    },

    removeCrop(cropId) {
      this.crops = this.crops.filter(c => c.id !== cropId)
    }
  }
})
