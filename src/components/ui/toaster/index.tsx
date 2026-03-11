import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

import { Toast } from '@/components/ui/toast'
import { ToasterContext, type ToasterContextValue } from './toaster-context'

type ToastPayload = Parameters<ToasterContextValue['toast']>[0]

type ToastItem = ToastPayload & {
   id: number
}

type ToasterProviderProps = {
   children: ReactNode
}

const TOAST_DURATION = 3000

export const ToasterProvider = ({ children }: ToasterProviderProps) => {
   const [toasts, setToasts] = useState<ToastItem[]>([])
   const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(
      new Map(),
   )

   const toast = useCallback((payload: ToastPayload) => {
      const id = Date.now()

      setToasts((prev) => [...prev, { id, ...payload }])

      const timerId = setTimeout(() => {
         setToasts((prev) => prev.filter((t) => t.id !== id))
         timersRef.current.delete(id)
      }, TOAST_DURATION)

      timersRef.current.set(id, timerId)
   }, [])

   useEffect(() => {
      return () => timersRef.current.forEach(clearTimeout)
   }, [])

   return (
      <ToasterContext.Provider value={{ toast }}>
         {children}
         <div className="pointer-events-none fixed right-6 bottom-6 z-60 flex w-full max-w-92 flex-col gap-3">
            {toasts.map(({ id, title, description }) => (
               <Toast key={id} title={title} description={description} />
            ))}
         </div>
      </ToasterContext.Provider>
   )
}
