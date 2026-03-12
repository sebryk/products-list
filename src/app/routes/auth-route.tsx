import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router'

import { useAuthStore } from '@/stores/auth'

type RouteStatus = 'authenticated' | 'guest'

type AuthRouteProps = PropsWithChildren<{
   requiredStatus: RouteStatus
}>

const LoadingScreen = () => (
   <main className="flex min-h-screen items-center justify-center bg-neutral-100 text-base font-medium text-neutral-500">
      Проверяем сессию...
   </main>
)
export const AuthRoute = ({ children, requiredStatus }: AuthRouteProps) => {
   const location = useLocation()
   const authStatus = useAuthStore((state) => state.status)

   if (authStatus === 'idle' || authStatus === 'loading') {
      return <LoadingScreen />
   }

   if (requiredStatus === 'authenticated' && authStatus !== 'authenticated') {
      return (
         <Navigate
            to="/auth/login"
            replace={true}
            state={{ from: location.pathname }}
         />
      )
   }

   if (requiredStatus === 'guest' && authStatus === 'authenticated') {
      return <Navigate to="/products" replace={true} />
   }

   return children
}
