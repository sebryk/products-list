import * as React from 'react'

import { cn } from '@/lib/utils'

function Checkbox({ className, ...props }: React.ComponentProps<'input'>) {
   return (
      <input
         type="checkbox"
         data-slot="checkbox"
         className={cn(
            'size-4 appearance-none rounded-[3px] border border-neutral-200 bg-neutral-0 align-middle checked:border-primary-600 checked:bg-primary-600',
            className,
         )}
         {...props}
      />
   )
}

export { Checkbox }
