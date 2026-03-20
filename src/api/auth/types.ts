import type { AuthUser } from '@/stores/auth/types'

export type RequestOptions = Omit<RequestInit, 'body'> & {
   body?: Record<string, unknown>
}

export type ApiErrorResponse = {
   message?: string
}

type RequestErrorOptions = {
   status?: number
   code: 'network' | 'invalid_credentials' | 'register_failed' | 'unknown'
   message: string
}

export class RequestError extends Error {
   status?: number
   code: RequestErrorOptions['code']

   constructor({ code, message, status }: RequestErrorOptions) {
      super(message)
      this.name = 'RequestError'
      this.code = code
      this.status = status
   }
}

export type LoginResponse = AuthUser & {
   accessToken: string
   refreshToken: string
}

export type RefreshResponse = {
   accessToken: string
   refreshToken: string
}

export type LoginCredentials = {
   login: string
   password: string
   rememberMe: boolean
}

export type RegisterPayload = {
   login: string
   password: string
}
