import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router'

import { useAuthStore } from '@/stores/auth'

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
   const location = useLocation()
   const status = useAuthStore((state) => state.status)

   if (status === 'idle' || status === 'loading') {
      return (
         <main className="flex min-h-screen items-center justify-center bg-neutral-100 text-base font-medium text-neutral-500">
            Проверяем сессию...
         </main>
      )
   }

   if (status !== 'authenticated') {
      return (
         <Navigate
            to="/auth/login"
            replace={true}
            state={{ from: location.pathname }}
         />
      )
   }

   return children
}
