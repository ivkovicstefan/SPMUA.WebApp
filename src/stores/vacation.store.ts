import { defineStore } from 'pinia'
import { useApi } from '@/helpers/Api'
import { type ApiWrapper } from '@/types/dtos/ApiWrapper'
import type { Vacation } from '@/types/entities/Vacation'

export const useVacationStore = defineStore('vacation', {
  state: () => {
    return {
      vacations: useApi('/api/vacation/vacations') as ApiWrapper,
      postVacation: useApi('/api/vacation/vacation') as ApiWrapper,
      putVacation: useApi('/api/vacation/vacation') as ApiWrapper,
      deleteVacation: useApi('/api/vacation/vacation/:id') as ApiWrapper
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
    },
    async updateVacation(vacation: Vacation): Promise<void> {
      await this.putVacation.execute(
        undefined,
        vacation,
        {
          method: 'PUT'
        },
        true
      )
    },
    async removeVacation(vacationId: number): Promise<void> {
      await this.deleteVacation.execute(
        '/api/vacation/vacation/' + vacationId,
        undefined,
        {
          method: 'DELETE'
        },
        true
      )
    }
  }
})
