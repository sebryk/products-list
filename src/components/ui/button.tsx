import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
   'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-[box-shadow,background-color,color] disabled:pointer-events-none disabled:opacity-50',
   {
      variants: {
         variant: {
            default:
               'bg-primary-600 text-neutral-0 shadow-[0px_8px_8px_0px_rgba(54,122,255,0.03)] border border-primary-500',
            ghost: 'bg-transparent text-neutral-900',
         },
         size: {
            default: 'h-14 px-4 py-4 text-lg leading-none',
            sm: 'h-9 rounded-md px-3',
         },
      },
      defaultVariants: {
         variant: 'default',
         size: 'default',
      },
   },
)

function Button({
   className,
   variant,
   size,
   type = 'button',
   ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
   return (
      <button
         type={type}
         data-slot="button"
         className={cn(buttonVariants({ variant, size, className }))}
         {...props}
      />
   )
}

export { Button }
