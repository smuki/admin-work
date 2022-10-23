import { defineStore } from 'pinia'

const useCacheStore = defineStore('cache', {
  state: () => {
    return {
      cache: [] as object[],
    }
  },
  getters: {
    setCache(state) {
      return state.cache
    },
  },
  actions: {
    setCache(cache: string[] = []) {
      this.cache = cache
    },
    resetCache() {
      this.$reset()
    },
  },
})

export default useCacheStore
