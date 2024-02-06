export class AppointmentFilters {
    appointmentDate: string = new Date().toISOString()
    customerFullName: string = ''
    serviceTypeId: number | null = null
    customerEmail = ''
    customerPhone = ''
}