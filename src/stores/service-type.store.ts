import { defineStore } from 'pinia'
import { useApi } from '@/helpers/Api'
import { type ApiWrapper } from '@/types/dtos/ApiWrapper'

export const useServiceTypeStore = defineStore('service-types', {
  state: () => {
    return {
      serviceTypes: useApi('/api/service-type/service-types') as ApiWrapper,
      postServiceType: useApi('/api/service-type/service-type') as ApiWrapper,
      putServiceType: useApi('/api/service-type/service-type') as ApiWrapper,
      deleteServiceType: useApi('/api/service-type/service-type/:id') as ApiWrapper
    }
  },
  actions: {
    async createServiceType(newServiceType: ServiceType): Promise<void> {
      await this.postServiceType.execute(
        undefined,
        newServiceType,
        {
          method: 'POST'
        },
        true
      )
    },
    async getServiceTypes(): Promise<void> {
      await this.serviceTypes.execute(undefined, undefined, undefined)
    },
    async updateServiceType(serviceTypeObject: any): Promise<void> {
      await this.putServiceType.execute(
        undefined,
        serviceTypeObject,
        {
          method: 'PUT'
        },
        true
      )
    },
    async removeServiceType(serviceTypeId: number): Promise<void> {
      await this.deleteServiceType.execute(
        '/api/service-type/service-type/' + serviceTypeId,
        undefined,
        {
          method: 'DELETE'
        },
        true
      )
    }
  }
})
