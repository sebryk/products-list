import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

export const variants = cva(
   cn(
      'z-10 inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold',
      'transition-[box-shadow,background-color,color]',
      'disabled:pointer-events-none disabled:opacity-50',
   ),
   {
      variants: {
         variant: {
            default:
               'bg-primary-600 text-neutral-0 shadow-[0px_8px_8px_0px_rgba(54,122,255,0.03)] cursor-pointer border border-primary-500 hover:bg-primary-500',
         },
         size: {
            default: 'h-[55px] px-4 py-4 text-lg leading-none',
         },
      },
      defaultVariants: {
         variant: 'default',
         size: 'default',
      },
   },
)
