import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'

type ModalWrapperProps = {
   isOpen: boolean
   onClose: () => void
   children: ReactNode
}

export const ModalWrapper = ({
   isOpen,
   onClose,
   children,
}: ModalWrapperProps) => {
   useEffect(() => {
      if (!isOpen) {
         return
      }

      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            onClose()
         }
      }

      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)

      return () => {
         document.body.style.overflow = ''
         window.removeEventListener('keydown', handleKeyDown)
      }
   }, [isOpen, onClose])

   if (!isOpen) return null

   return createPortal(
      <div
         className="
           fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6 disabled:not-first-of-type:flex
         "
      >
         <div
            aria-label="Закрыть модальное окно"
            className="absolute inset-0"
            role="button"
            tabIndex={0}
            onClick={onClose}
         />
         <div
            role="dialog"
            className="
              relative z-10 w-full max-w-160 rounded-[40px] bg-neutral-0 p-1.5
              shadow-[0px_24px_32px_0px_rgba(0,0,0,0.04)]
            "
         >
            <div className="rounded-[34px] bg-modal-overlay-fade px-5 py-8 sm:p-12">
               <div className="flex justify-end">
                  <Button variant="icon" onClick={onClose}>
                     <X className="size-5.5" />
                  </Button>
               </div>
               {children}
            </div>
         </div>
      </div>,
      document.body,
   )
}
