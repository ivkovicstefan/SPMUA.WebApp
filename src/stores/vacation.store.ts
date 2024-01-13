import { defineStore } from 'pinia'
import { useApi } from '@/helpers/Api'
import { type ApiWrapper } from '@/types/dtos/ApiWrapper'

export const useVacationStore = defineStore('vacation', {
  state: () => {
    return {
      vacations: useApi('/api/vacation/vacations') as ApiWrapper,
    }
  },
  actions: {
    async getVacations(): Promise<void> {
      await this.vacations.execute(undefined, undefined, undefined, true)
    }
  }
})
