import { ref } from 'vue'
import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios'
import { type ApiWrapper } from '../types/dtos/ApiWrapper'
import { useAuthStore } from '@/stores/auth.store'

const baseUrl = 'https://localhost:7236'

export const useApi = (initialUrl: string): ApiWrapper => {
  const data = ref<any>()
  const response = ref<AxiosResponse | null>(null)
  const config = ref<AxiosRequestConfig | null>(null)
  const isLoading = ref<boolean>(false)
  const isAborted = ref<boolean>(false)
  const isFinished = ref<boolean>(false)

  const execute = async (
    url?: string,
    requestData?: any,
    requestConfig?: AxiosRequestConfig,
    isAuthTokenRequired: boolean = false
  ) => {
    data.value = null
    response.value = null
    config.value = requestConfig
    isLoading.value = true
    isAborted.value = false
    isFinished.value = false

    if (isAuthTokenRequired) {
      requestConfig = {
        ...requestConfig,
        ...{
          headers: {
            Authorization: `Bearer ${useAuthStore().admin.token}`
          }
        }
      }
    }

    try {
      console.log(baseUrl + initialUrl)

      const result = await axios.request({
        url: baseUrl + (url ? url : initialUrl),
        method: requestConfig?.method || 'GET',
        data: requestData,
        ...requestConfig
      })

      data.value = result.data
      response.value = result

      console.log(data.value)
    } catch (error: any) {
      console.error(error)
      response.value = error.response
      isAborted.value = true
    } finally {
      isFinished.value = true
      isLoading.value = false
    }
  }

  return {
    data,
    response,
    config,
    isLoading,
    isAborted,
    isFinished,
    execute
  }
}
