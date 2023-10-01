import { type Ref } from 'vue'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ApiWrapper {
  data: Ref<any>
  response: Ref<AxiosResponse | null>
  config: Ref<AxiosRequestConfig | null>
  isLoading: Ref<boolean>
  isAborted: Ref<boolean>
  isFinished: Ref<boolean>
}
