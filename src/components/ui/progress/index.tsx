import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

type ProgressProps = {
   isActive: boolean
}

export const Progress = ({ isActive }: ProgressProps) => {
   const [isVisible, setIsVisible] = useState(isActive)
   const [isCompleting, setIsCompleting] = useState(false)
   const [isStarted, setIsStarted] = useState(false)

   useEffect(() => {
      if (isActive) {
         const showTimeoutId = setTimeout(() => {
            setIsVisible(true)
            setIsCompleting(false)
            setIsStarted(false)
         }, 0)

         const startTimeoutId = setTimeout(() => {
            setIsStarted(true)
         }, 0)

         return () => {
            clearTimeout(showTimeoutId)
            clearTimeout(startTimeoutId)
         }
      }

      if (!isVisible) {
         return
      }

      const completeTimeoutId = setTimeout(() => {
         setIsCompleting(true)
         setIsStarted(true)
      }, 0)

      const hideTimeoutId = setTimeout(() => {
         setIsVisible(false)
         setIsCompleting(false)
         setIsStarted(false)
      }, 50)

      return () => {
         clearTimeout(completeTimeoutId)
         clearTimeout(hideTimeoutId)
      }
   }, [isActive, isVisible])

   if (!isVisible) {
      return null
   }
   const transitionClass = isStarted
      ? 'translate-x-0 opacity-100'
      : '-translate-x-full opacity-100'

   const progressStateClass = isCompleting
      ? 'w-full translate-x-0 opacity-100 transition-[width,opacity] duration-50 ease-in'
      : cn('w-1/2 transition-transform duration-260 ease-out', transitionClass)

   return (
      <div
         aria-hidden="true"
         className="relative h-1 w-full overflow-hidden rounded-full bg-neutral-200"
      >
         <div
            className={cn(
               'bg-primary-600 absolute inset-y-0 left-0 rounded-full',
               progressStateClass,
            )}
         />
      </div>
   )
}
