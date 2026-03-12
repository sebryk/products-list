import { Navigate, Route, Routes } from 'react-router'

import { AuthRoute } from '@/app/routes/auth-route'
import { LoginPage } from '@/pages/auth/login'
import { RegisterPage } from '@/pages/auth/register'
import { ProductsPage } from '@/pages/products'

export const AppRouter = () => {
   return (
      <Routes>
         <Route
            path="/"
            element={
               <AuthRoute requiredStatus="authenticated">
                  <Navigate to="/products" replace={true} />
               </AuthRoute>
            }
         />
         <Route
            path="/products"
            element={
               <AuthRoute requiredStatus="authenticated">
                  <ProductsPage />
               </AuthRoute>
            }
         />
         <Route
            path="/auth/login"
            element={
               <AuthRoute requiredStatus="guest">
                  <LoginPage />
               </AuthRoute>
            }
         />
         <Route
            path="/auth/register"
            element={
               <AuthRoute requiredStatus="guest">
                  <RegisterPage />
               </AuthRoute>
            }
         />
      </Routes>
   )
}
