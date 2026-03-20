import { cn } from '@/lib/utils'
import { useProgressState } from './use-progress-state'

type ProgressProps = {
   isActive: boolean
}

export const Progress = ({ isActive }: ProgressProps) => {
   const { isVisible, isCompleting, isStarted } = useProgressState(isActive)

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
               'absolute inset-y-0 left-0 rounded-full bg-primary-600',
               progressStateClass,
            )}
         />
      </div>
   )
}
