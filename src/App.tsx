import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'

import { AppRouter } from '@/app/router'
import { queryClient } from '@/lib/react-query'

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <AppRouter />
         </BrowserRouter>
      </QueryClientProvider>
   )
}

export default App
