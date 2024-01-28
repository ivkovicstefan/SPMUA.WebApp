export class Appointment {
  serviceTypeId: number = 1
  appointmentDate: Date | null = null
  customerFirstName: string = ''
  customerLastName: string = ''
  customerPhone: string = ''
  customerEmail: string = ''

  reset() {
    this.serviceTypeId = 1
    this.appointmentDate = null
    this.customerFirstName = ''
    this.customerLastName = ''
    this.customerPhone = ''
    this.customerEmail = ''
  }
}
