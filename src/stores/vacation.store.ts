import { defineStore } from 'pinia'
import { useApi } from '@/helpers/Api'
import { type ApiWrapper } from '@/types/dtos/ApiWrapper'
import type { Vacation } from '@/types/entities/Vacation'

export const useVacationStore = defineStore('vacation', {
  state: () => {
    return {
      vacations: useApi('/api/vacation/vacations') as ApiWrapper,
      postVacation: useApi('/api/vacation/vacation') as ApiWrapper
    }
  },
  actions: {
    async getVacations(): Promise<void> {
      await this.vacations.execute(undefined, undefined, undefined, true)
    },
    async createVacation(newVacation: Vacation): Promise<void> {
      await this.postVacation.execute(
        undefined, 
        newVacation, {
        method: 'POST'
        },
        true)
    }
  }
})
