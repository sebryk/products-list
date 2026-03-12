import type { AuthSession } from '@/stores/auth/types'

const AUTH_STORAGE_KEY = 'aiti-guru.auth-session'

const getStorage = (rememberMe: boolean) =>
   rememberMe ? window.localStorage : window.sessionStorage

const parseSession = (value: string | null) => {
   if (!value) return null
   try {
      return JSON.parse(value) as AuthSession
   } catch {
      return null
   }
}

export const loadAuthSession = () => {
   const localSession = parseSession(localStorage.getItem(AUTH_STORAGE_KEY))
   if (localSession) return localSession
   return parseSession(sessionStorage.getItem(AUTH_STORAGE_KEY))
}

export const saveAuthSession = (session: AuthSession) => {
   const targetStorage = getStorage(session.rememberMe)
   targetStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))

   const secondaryStorage = session.rememberMe ? sessionStorage : localStorage
   secondaryStorage.removeItem(AUTH_STORAGE_KEY)
}

export const clearAuthSession = () => {
   localStorage.removeItem(AUTH_STORAGE_KEY)
   sessionStorage.removeItem(AUTH_STORAGE_KEY)
}
