import { defineStore } from 'pinia'
import axios from 'axios'

const baseApiUrl = 'https://localhost:7236/api/admin'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            admin: {
                token: '',
                isAuthenticated: false,
                firstName: 'Unknown',
                lastName: 'Admin'
            },
            isApiRequestLoading: false
        }
    },
    actions: {
        async login(email: string, password: string) {
            let response: {
                isSuccessful: boolean,
                data: string
            }

            this.isApiRequestLoading = true;
            
            try {
                let result = await axios.post(baseApiUrl + '/login', {
                    email: email,
                    password: password
                });

                response = {
                    isSuccessful: true,
                    data: ''
                }

                this.admin.isAuthenticated = true,
                this.admin.token = result.data
            } catch (error) {
                response = {
                    isSuccessful: false,
                    data: error.response.data.description
                }

            } finally {
                this.isApiRequestLoading = false;
            }

            return response;
        }
    }
})