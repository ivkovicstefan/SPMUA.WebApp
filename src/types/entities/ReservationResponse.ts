export class ReservationResponse {
  appointmentId: number
  isAppointmentConfirmed: boolean
  responseComment: string

  constructor(
    appointmentId: number = 0,
    isAppointmentConfirmed: boolean = false,
    responseComment: string = ''
  ) {
    this.appointmentId = appointmentId
    this.isAppointmentConfirmed = isAppointmentConfirmed
    this.responseComment = responseComment
  }

  clear() {
    this.appointmentId = 0
    this.isAppointmentConfirmed = false
    this.responseComment = ''
  }
}
