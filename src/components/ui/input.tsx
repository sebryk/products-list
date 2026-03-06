import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type = 'text', ...props }: React.ComponentProps<'input'>) {
   return (
      <input
         type={type}
         data-slot="input"
         className={cn(
            'flex h-14 w-full rounded-xl border-[1.5px] border-neutral-200 bg-neutral-0 px-4 py-3 text-lg text-neutral-900 outline-none placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-primary-500/40',
            className,
         )}
         {...props}
      />
   )
}

export { Input }
