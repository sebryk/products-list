import type { AuthSession, AuthUser } from '@/stores/types/auth'

const API_BASE_URL = 'https://dummyjson.com'
const ACCESS_TOKEN_TTL_MINUTES = 30

type RequestOptions = Omit<RequestInit, 'body'> & {
   body?: Record<string, unknown>
}

type DummyJsonErrorResponse = {
   message?: string
}

type RequestErrorOptions = {
   status?: number
   code: 'network' | 'invalid_credentials' | 'register_failed' | 'unknown'
   message: string
}

class RequestError extends Error {
   status?: number
   code: RequestErrorOptions['code']

   constructor({ code, message, status }: RequestErrorOptions) {
      super(message)
      this.name = 'RequestError'
      this.code = code
      this.status = status
   }
}

type LoginResponse = AuthUser & {
   accessToken: string
   refreshToken: string
}

type RefreshResponse = {
   accessToken: string
   refreshToken: string
}

const getErrorPayload = async (response: Response) => {
   try {
      return (await response.json()) as DummyJsonErrorResponse
   } catch {
      return {}
   }
}

const request = async <TResponse>(
   path: string,
   { body, headers, ...init }: RequestOptions = {},
) => {
   let response: Response

   try {
      response = await fetch(`${API_BASE_URL}${path}`, {
         ...init,
         headers: {
            'Content-Type': 'application/json',
            ...headers,
         },
         body: body ? JSON.stringify(body) : undefined,
      })
   } catch {
      throw new RequestError({
         code: 'network',
         message:
            'Не удалось подключиться к серверу. Проверьте соединение и попробуйте снова.',
      })
   }

   if (!response.ok) {
      const payload = await getErrorPayload(response)
      const serverMessage = payload.message?.trim()

      throw new RequestError({
         code: 'unknown',
         status: response.status,
         message: serverMessage || 'Не удалось выполнить запрос.',
      })
   }

   return (await response.json()) as TResponse
}

const toLoginError = (error: unknown) => {
   if (error instanceof RequestError) {
      if (error.code === 'network') {
         return error
      }

      if (error.status === 400 || error.status === 401) {
         return new RequestError({
            code: 'invalid_credentials',
            status: error.status,
            message: 'Неверный логин или пароль.',
         })
      }
   }

   return new RequestError({
      code: 'unknown',
      message: 'Не удалось выполнить вход. Попробуйте еще раз.',
   })
}

const toRegisterError = (error: unknown) => {
   if (error instanceof RequestError && error.code === 'network') {
      return error
   }

   return new RequestError({
      code: 'register_failed',
      message: 'Не удалось создать аккаунт. Попробуйте еще раз.',
   })
}

export const login = async (credentials: {
   login: string
   password: string
   rememberMe: boolean
}): Promise<AuthSession> => {
   try {
      const response = await request<LoginResponse>('/auth/login', {
         method: 'POST',
         body: {
            username: credentials.login,
            password: credentials.password,
            expiresInMins: ACCESS_TOKEN_TTL_MINUTES,
         },
      })

      return {
         accessToken: response.accessToken,
         refreshToken: response.refreshToken,
         rememberMe: credentials.rememberMe,
         user: {
            id: response.id,
            username: response.username,
            email: response.email,
            firstName: response.firstName,
            lastName: response.lastName,
            gender: response.gender,
            image: response.image,
         },
      }
   } catch (error) {
      throw toLoginError(error)
   }
}

export const register = async (payload: {
   login: string
   password: string
}) => {
   try {
      return await request<AuthUser>('/users/add', {
         method: 'POST',
         body: {
            username: payload.login,
            password: payload.password,
            firstName: payload.login,
            lastName: 'User',
         },
      })
   } catch (error) {
      throw toRegisterError(error)
   }
}

export const getCurrentUser = async (accessToken: string) => {
   return request<AuthUser>('/auth/me', {
      method: 'GET',
      headers: {
         Authorization: `Bearer ${accessToken}`,
      },
   })
}

export const refreshSessionTokens = async (refreshToken: string) => {
   return request<RefreshResponse>('/auth/refresh', {
      method: 'POST',
      body: {
         refreshToken,
         expiresInMins: ACCESS_TOKEN_TTL_MINUTES,
      },
   })
}
