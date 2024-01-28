export class Admin {
  fullName: string
  isAuthenticated: boolean
  token: string

  constructor(fullName: string, isAuthenticated: boolean, token: string) {
    this.fullName = fullName
    this.isAuthenticated = isAuthenticated
    this.token = token
  }
}
