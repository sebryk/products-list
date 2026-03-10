import { Route, Routes } from 'react-router'

import { GuestRoute } from '@/app/routes/guest-route'
import { ProtectedRoute } from '@/app/routes/protected-route'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/auth/login'
import { RegisterPage } from '@/pages/auth/register'

export function AppRouter() {
   return (
      <Routes>
         <Route
            path="/"
            element={
               <ProtectedRoute>
                  <HomePage />
               </ProtectedRoute>
            }
         />
         <Route
            path="/auth/login"
            element={
               <GuestRoute>
                  <LoginPage />
               </GuestRoute>
            }
         />
         <Route
            path="/auth/register"
            element={
               <GuestRoute>
                  <RegisterPage />
               </GuestRoute>
            }
         />
      </Routes>
   )
}
