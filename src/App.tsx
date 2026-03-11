import { useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'

import { AppRouter } from '@/app/router'
import { queryClient } from '@/lib/react-query'
import { useAuthStore } from '@/stores/auth'

function App() {
   const initialize = useAuthStore((state) => state.initialize)

   useEffect(() => {
      void initialize()
   }, [initialize])

   return (
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <AppRouter />
         </BrowserRouter>
      </QueryClientProvider>
   )
}

export default App
