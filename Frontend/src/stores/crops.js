import { defineStore } from 'pinia'
import axios from 'axios'

export const useCropsStore = defineStore('crops', {
  state: () => ({
    crops: [],
    loading: false
  }),

  actions: {
    async fetchCrops() {
      this.loading = true
      try {
        const res = await axios.get('http://localhost:3000/api/crops')
        this.crops = res.data
      } finally {
        this.loading = false
      }
    },

    async fetchCropById(id) {
      const res = await axios.get(`http://localhost:3000/api/crops/${id}`)
      return res.data
    },

    addCrop(crop) {
      // Optimistic update
      this.crops.unshift(crop)
    }
  }
})
