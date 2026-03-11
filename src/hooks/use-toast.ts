import { useContext } from 'react'

import { ToasterContext } from '@/components/ui/toaster/toaster-context'

export const useToast = () => {
   const context = useContext(ToasterContext)

   if (!context) {
      throw new Error('useToast must be used within ToasterProvider')
   }

   return context
}
