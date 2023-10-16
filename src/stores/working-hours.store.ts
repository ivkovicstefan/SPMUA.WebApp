import { defineStore } from 'pinia'
import { useApi } from '@/helpers/Api'
import { type ApiWrapper } from '@/types/dtos/ApiWrapper'

export const useWorkingHoursStore = defineStore('working-hours', {
  state: () => {
    return {
      workingDays: useApi('/api/working-day/working-days') as ApiWrapper,
      putWorkingDays: useApi('/api/working-day/working-days') as ApiWrapper
    }
  },
  actions: {
    async getWorkingDays(): Promise<void> {
      await this.workingDays.execute(undefined, undefined, undefined)
    },
    async updateWorkingDays(): Promise<void> {
      await this.putWorkingDays.execute(
        undefined,
        this.workingDays.data,
        {
          method: 'PUT'
        },
        true
      )
    }
  }
})
