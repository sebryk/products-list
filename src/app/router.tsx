import { Navigate, Route, Routes } from 'react-router'

import { GuestRoute } from '@/app/routes/guest-route'
import { ProtectedRoute } from '@/app/routes/protected-route'
import { LoginPage } from '@/pages/auth/login'
import { RegisterPage } from '@/pages/auth/register'
import { ProductsPage } from '@/pages/products'

export function AppRouter() {
   return (
      <Routes>
         <Route
            path="/"
            element={
               <ProtectedRoute>
                  <Navigate to="/products" replace={true} />
               </ProtectedRoute>
            }
         />
         <Route
            path="/products"
            element={
               <ProtectedRoute>
                  <ProductsPage />
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
