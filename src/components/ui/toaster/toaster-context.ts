import { createContext } from 'react'

type ToastPayload = {
   title: string
   description?: string
}

export type ToasterContextValue = {
   toast: (payload: ToastPayload) => void
}

export const ToasterContext = createContext<ToasterContextValue | null>(null)
