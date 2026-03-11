import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { variants } from './variants'

type InputIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

type InputProps = React.ComponentProps<'input'> &
   VariantProps<typeof variants> & {
      hasError?: boolean
      startIcon?: InputIcon
   }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   (
      {
         className,
         type = 'text',
         hasError = false,
         variant,
         startIcon: StartIcon,
         ...props
      },
      ref,
   ) => {
      return (
         <div className="relative w-full">
            {StartIcon && (
               <StartIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-5 size-6 -translate-y-1/2 text-neutral-500"
               />
            )}
            <input
               ref={ref}
               type={type}
               className={cn(
                  variants({ variant }),
                  hasError
                     ? 'border-danger-500'
                     : variant !== 'search' && 'border-neutral-200',
                  StartIcon && 'pl-13',
                  className,
               )}
               {...props}
            />
         </div>
      )
   },
)

Input.displayName = 'Input'

export { Input }
