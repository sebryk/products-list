import * as React from 'react'

import { cn } from '@/lib/utils'

type LabelProps = Omit<React.ComponentProps<'label'>, 'htmlFor'> & {
   htmlFor: string
}

const Label = ({ className, htmlFor, ...props }: LabelProps) => {
   return (
      <label
         htmlFor={htmlFor}
         data-slot="label"
         className={cn(
            'text-lg font-medium tracking-[-0.015em] text-neutral-900',
            className,
         )}
         {...props}
      />
   )
}

export { Label }
