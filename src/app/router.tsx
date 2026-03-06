import { Route, Routes } from 'react-router'

import { HomePage } from '@/pages/home-page'
import { LoginPage } from '@/pages/auth/login-page'
import { RegisterPage } from '@/pages/auth/register-page'

export function AppRouter() {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/auth/login" element={<LoginPage />} />
         <Route path="/auth/register" element={<RegisterPage />} />
      </Routes>
   )
}
