import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
import { Admin } from '../types/entities/Admin'
import { Response } from '../types/dtos/Response'

const baseApiUrl = 'https://localhost:7236/api/admin'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      admin: ref(JSON.parse(localStorage.getItem('admin') || '{}')),
      isApiRequestLoading: false
    }
  },
  actions: {
    async login(email: String, password: String) {
      let response: Response

      this.isApiRequestLoading = true

      try {
        const result = await axios.post(baseApiUrl + '/login', {
          email: email,
          password: password
        })

        response = new Response(true, '', '')

        const admin = new Admin(result.data.adminFirstName + ' ' + result.data.adminLastName, true, result.data.token)
        this.admin = admin
        localStorage.setItem('admin', JSON.stringify(admin))
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          response = new Response(false, '', error.response?.data.description)
        } else {
          throw error
        }
      } finally {
        this.isApiRequestLoading = false
      }

      return response
    },
    logout() {
      //TODO: Check if there is a need to call API to destroy current token
      this.admin = {}
      localStorage.removeItem('admin')

    }
  }
})
