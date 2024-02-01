export class Appointment {
  appointmentId: number = 0
  serviceTypeId: number = 1
  appointmentDate: Date | null = null
  customerFirstName: string = ''
  customerLastName: string = ''
  customerPhone: string = ''
  customerEmail: string = ''

  reset() {
    this.appointmentId = 0
    this.serviceTypeId = 1
    this.appointmentDate = null
    this.customerFirstName = ''
    this.customerLastName = ''
    this.customerPhone = ''
    this.customerEmail = ''
  }
}
