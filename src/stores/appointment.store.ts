import { defineStore } from 'pinia'
import { useApi } from '@/helpers/Api'
import { type ApiWrapper } from '@/types/dtos/ApiWrapper'
import { ReservationResponse } from '@/types/entities/ReservationResponse'
import { Appointment } from '@/types/entities/Appointment'

export const useAppointmentStore = defineStore('appointment', {
  state: () => {
    return {
      appointments: useApi('/api/appointment/appointments') as ApiWrapper,
      patchAppointmentStatus: useApi('/api/appointment/appointment/status') as ApiWrapper,
      unavailableDates: useApi('/api/appointment/unavailable-dates') as ApiWrapper,
      availableHours: useApi('/api/appointment/available-hours') as ApiWrapper,
      postAppointment: useApi('/api/appointment/appointment') as ApiWrapper
    }
  },
  actions: {
    async getAppointments(
      appointmentDate: Date|null = null,
      customerFullName: String|null = null,
      customerEmail: String|null = null,
      serviceTypeId: Number|null = null,
      customerPhone: String|null = null
    ): Promise<void> {

      if (appointmentDate) {
        appointmentDate.setTime(appointmentDate.getTime() - appointmentDate.getTimezoneOffset() * 60000)
      }

      await this.appointments.execute(undefined, undefined, {
        params: {
          AppointmentDate: appointmentDate,
          CustomerFullName: customerFullName,
          CustomerEmail: customerEmail,
          ServiceTypeId: serviceTypeId,
          CustomerPhone: customerPhone
        }
      }, true)

      console.log(this.appointments.data)
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
    },
    async getUnavailableDates(serviceTypeId: number, fromDate: Date, toDate: Date): Promise<void> {
      await this.unavailableDates.execute(undefined, undefined, {
        params: {
          serviceTypeId: serviceTypeId,
          fromDate: fromDate.toISOString(),
          toDate: toDate.toISOString()
        }
      })
    },
    async getAvailableHours(serviceTypeId: number, date: Date): Promise<void> {
      date.setTime(date.getTime() - date.getTimezoneOffset() * 60000)
      
      await this.availableHours.execute(undefined, undefined, {
        params: {
          serviceTypeId: serviceTypeId,
          date: date
        }
      })
    },
    async createAppointment(newAppointmentObject: Appointment): Promise<void> {
      newAppointmentObject.appointmentDate?.setTime(newAppointmentObject.appointmentDate.getTime() - newAppointmentObject.appointmentDate.getTimezoneOffset() * 60000)
      
      await this.postAppointment.execute(
        undefined, 
        newAppointmentObject, {
          method: 'POST'
        },
        true
      )
    }
  }
})
