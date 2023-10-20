import { defineStore } from 'pinia'
import { useApi } from '@/helpers/Api'
import { type ApiWrapper } from '@/types/dtos/ApiWrapper'

export const useServiceTypeStore = defineStore('service-types', {
  state: () => {
    return {
      serviceTypes: useApi('/api/service-type/service-types') as ApiWrapper,
      putServiceType: useApi('/api/service-type/service-type') as ApiWrapper
    }
  },
  actions: {
    async getServiceTypes(): Promise<void> {
      await this.serviceTypes.execute(undefined, undefined, undefined)
    },
    async updateServiceType(serviceTypeObject: any): Promise<void> {
      await this.putServiceType.execute(
        undefined, 
        serviceTypeObject, 
        {
          method: "PUT"
        },
        true)
    }
  }
})
