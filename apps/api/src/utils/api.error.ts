// export class ApiError extends Error {
//   public readonly status: number
//   public readonly isOperational: boolean

//   constructor(message: string, status: number = 500, isOperational = true) {
//     super(message)
//     Object.setPrototypeOf(this, new.target.prototype) // Corrige prototype

//     this.name = this.constructor.name
//     this.status = status
//     this.isOperational = isOperational

//     Error.captureStackTrace(this)
//   }
// }

export class ApiError extends Error {
  public statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    // this.message = message // teste
    this.statusCode = statusCode
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
