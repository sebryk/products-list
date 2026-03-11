import { create } from 'zustand'

import {
   clearAuthSession,
   loadAuthSession,
   saveAuthSession,
} from '@/lib/auth-storage'
import { getCurrentUser, refreshSessionTokens } from '@/api/auth'
import type { AuthSession, AuthUser } from '@/stores/types/auth'

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'guest'

type AuthStore = {
   status: AuthStatus
   accessToken: string | null
   refreshToken: string | null
   user: AuthUser | null
   rememberMe: boolean
   setSession: (session: AuthSession) => void
   clearSession: () => void
   initialize: () => Promise<void>
   refreshSession: () => Promise<boolean>
   logout: () => void
}

const guestState = {
   status: 'guest' as const,
   accessToken: null,
   refreshToken: null,
   user: null,
   rememberMe: false,
}

const normalizeSession = (session: AuthSession, user: AuthUser) => ({
   ...session,
   user,
   status: 'authenticated' as const,
})

export const useAuthStore = create<AuthStore>((set, get) => ({
   status: 'idle',
   accessToken: null,
   refreshToken: null,
   user: null,
   rememberMe: false,
   setSession: (session) => {
      saveAuthSession(session)
      set(normalizeSession(session, session.user))
   },
   clearSession: () => {
      clearAuthSession()
      set(guestState)
   },
   initialize: async () => {
      if (get().status === 'loading') return

      set({ status: 'loading' })

      const storedSession = loadAuthSession()

      if (!storedSession) {
         set(guestState)
         return
      }

      try {
         const user = await getCurrentUser(storedSession.accessToken)
         const nextSession = { ...storedSession, user }

         saveAuthSession(nextSession)
         set(normalizeSession(nextSession, user))
      } catch {
         const isRefreshed = await get().refreshSession()

         if (!isRefreshed) {
            get().clearSession()
         }
      }
   },
   refreshSession: async () => {
      const currentSession = loadAuthSession()

      if (!currentSession?.refreshToken) {
         return false
      }

      set({ status: 'loading' })

      try {
         const refreshedTokens = await refreshSessionTokens(
            currentSession.refreshToken,
         )
         const user = await getCurrentUser(refreshedTokens.accessToken)
         const nextSession: AuthSession = {
            accessToken: refreshedTokens.accessToken,
            refreshToken: refreshedTokens.refreshToken,
            rememberMe: currentSession.rememberMe,
            user,
         }

         saveAuthSession(nextSession)
         set(normalizeSession(nextSession, user))

         return true
      } catch {
         return false
      }
   },
   logout: () => {
      get().clearSession()
   },
}))
