import * as React from 'react'

import { cn } from '@/lib/utils'

type InputProps = React.ComponentProps<'input'> & {
   hasError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, type = 'text', hasError = false, ...props }, ref) => {
      return (
         <input
            ref={ref}
            type={type}
            className={cn(
               'bg-neutral-0 focus-visible:ring-primary-500/40 flex h-14 w-full rounded-xl border-[1.5px] px-4 py-3 text-lg text-neutral-900 outline-none placeholder:text-neutral-500 focus-visible:ring-2',
               hasError ? 'border-danger-500' : 'border-neutral-200',
               className,
            )}
            {...props}
         />
      )
   },
)

Input.displayName = 'Input'

export { Input }
