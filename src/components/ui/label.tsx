import * as React from 'react'

import { cn } from '@/lib/utils'

function Label({ className, ...props }: React.ComponentProps<'label'>) {
   return (
      <label
         data-slot="label"
         className={cn('text-lg font-medium tracking-[-0.015em] text-neutral-900', className)}
         {...props}
      />
   )
}

export { Label }
