export class AppointmentFilters {
    appointmentDate: Date|null = null
    customerFullName: string|null = null
    serviceType: ServiceTypeFilter = new ServiceTypeFilter()
    customerEmail: string|null = null
    customerPhone: string|null = null
}

class ServiceTypeFilter {
    serviceTypeId: Number | null = null
    serviceTypeName: String = 'Bilo koja usluga'
}