import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

import { useAuthStore } from '@/stores/auth'

export const GuestRoute = ({ children }: PropsWithChildren) => {
   const status = useAuthStore((state) => state.status)

   if (status === 'idle' || status === 'loading') {
      return (
         <main className="flex min-h-screen items-center justify-center bg-neutral-100 text-base font-medium text-neutral-500">
            Проверяем сессию...
         </main>
      )
   }

   if (status === 'authenticated') {
      return <Navigate to="/products" replace={true} />
   }

   return children
}
