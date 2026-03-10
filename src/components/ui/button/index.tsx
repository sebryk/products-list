import type { ComponentProps } from 'react'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { variants } from './variants'

export const Button = ({
   className,
   variant,
   size,
   type = 'button',
   ...props
}: ComponentProps<'button'> & VariantProps<typeof variants>) => {
   return (
      <button
         type={type}
         data-slot="button"
         className={cn(variants({ variant, size, className }))}
         {...props}
      />
   )
}
