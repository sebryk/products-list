import type { AuthSession } from '@/types/auth'

const AUTH_STORAGE_KEY = 'aiti-guru.auth-session'

const getStorage = (rememberMe: boolean) => {
   if (typeof window === 'undefined') return null

   return rememberMe ? window.localStorage : window.sessionStorage
}

const parseSession = (value: string | null) => {
   if (!value) return null

   try {
      return JSON.parse(value) as AuthSession
   } catch {
      return null
   }
}

export const loadAuthSession = () => {
   if (typeof window === 'undefined') return null

   const localSession = parseSession(
      window.localStorage.getItem(AUTH_STORAGE_KEY),
   )

   if (localSession) return localSession

   return parseSession(window.sessionStorage.getItem(AUTH_STORAGE_KEY))
}

export const saveAuthSession = (session: AuthSession) => {
   const targetStorage = getStorage(session.rememberMe)

   if (!targetStorage || typeof window === 'undefined') return

   targetStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))

   const secondaryStorage = session.rememberMe
      ? window.sessionStorage
      : window.localStorage

   secondaryStorage.removeItem(AUTH_STORAGE_KEY)
}

export const clearAuthSession = () => {
   if (typeof window === 'undefined') return

   window.localStorage.removeItem(AUTH_STORAGE_KEY)
   window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
}
