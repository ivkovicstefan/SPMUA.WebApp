export class Response {
  isSuccessful: boolean
  data: any
  message: string

  constructor(isSuccessful: boolean, data: any, message: string) {
    this.isSuccessful = isSuccessful
    this.data = data
    this.message = message
  }
}
