import * as React from 'react'

import CheckboxIcon from '@/assets/auth-page/icons/checkbox-icon.svg?react'
import { cn } from '@/lib/utils'

type CheckboxProps = Omit<React.ComponentProps<'input'>, 'type'> & {
   label: React.ReactNode
}

const Checkbox = ({ className, id, label, ...props }: CheckboxProps) => {
   const generatedId = React.useId()
   const checkboxId = id ?? generatedId

   return (
      <label
         htmlFor={checkboxId}
         className={cn(
            'z-10 inline-flex cursor-pointer items-center gap-2.5 align-middle select-none',
            'has-disabled:cursor-not-allowed has-disabled:opacity-60',
            className,
         )}
      >
         <span className="relative inline-flex size-6 shrink-0 align-middle">
            <input
               id={checkboxId}
               type="checkbox"
               data-slot="checkbox"
               className="peer sr-only"
               {...props}
            />

            <CheckboxIcon
               aria-hidden="true"
               className="pointer-events-none absolute inset-0 size-6"
            />

            <span
               aria-hidden="true"
               className="peer-checked:bg-primary-600 pointer-events-none absolute inset-1 rounded-[3px] bg-transparent transition-colors"
            />

            <span
               aria-hidden="true"
               className="peer-focus-visible:ring-primary-500 pointer-events-none absolute inset-0 rounded-[3px] ring-offset-1 transition peer-focus-visible:ring-2"
            />
         </span>

         <span className="text-sm font-medium text-neutral-500 sm:text-base">
            {label}
         </span>
      </label>
   )
}

export { Checkbox }
