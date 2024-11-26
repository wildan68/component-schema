import { defineStore } from 'pinia'
import { Feature } from '@/constant'

export const useFeatureStore = defineStore('feature', {
  state: () => ({
    currentPage: 'login',
  }),
  actions: {
    [Feature.SET_CURRENT_PAGE] (page: string) {
      this.currentPage = page
    }
  },
  getters: {
    [Feature.GET_PAGE] (state) {
      return state.currentPage
    }
  },
})