import { defineStore } from 'pinia'
import { useApi } from '@/helpers/Api'
import { type ApiWrapper } from '@/types/dtos/ApiWrapper'
import { ReservationResponse } from '@/types/entities/ReservationResponse'

export const useAppointmentStore = defineStore('appointment', {
  state: () => {
    return {
      appointments: useApi('/api/appointment/appointments') as ApiWrapper,
      patchAppointmentStatus: useApi('/api/appointment/appointment/status') as ApiWrapper
    }
  },
  actions: {
    async getAppointments(): Promise<void> {
      await this.appointments.execute(undefined, undefined, undefined, true)
    },
    async updateAppointmentStatus(reservationResponseObject: ReservationResponse): Promise<void> {
      await this.patchAppointmentStatus.execute(
        undefined,
        reservationResponseObject,
        {
          method: 'PATCH'
        },
        true
      )
    }
  }
})
