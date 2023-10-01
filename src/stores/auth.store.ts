import { defineStore } from 'pinia'
import axios, { AxiosError} from 'axios'
import { Admin } from '../types/entities/Admin'
import { Response } from '../types/dtos/Response'

const baseApiUrl = 'https://localhost:7236/api/admin'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            admin: null as unknown as Admin,
            isApiRequestLoading: false
        }
    },
    actions: {
        async login(email: String, password: String) {
            let response: Response

            this.isApiRequestLoading = true;
            
            try {
                const result = await axios.post(baseApiUrl + '/login', {
                    email: email,
                    password: password
                });

                response = new Response(true, "", "")
                //TODO: Replace "Unknown Admin" with actual admin fullname when backend changes the response object
                this.admin = new Admin("Unknown Admin", true, result.data)
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    response = new Response(false, "", error.response?.data.description)
                }
                else {
                    throw error
                }
            } finally {
                this.isApiRequestLoading = false;
            }

            return response;
        }
    }
})