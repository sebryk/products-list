import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

export const variants = cva(
   cn(
      `z-10 inline-flex items-center justify-center text-sm font-semibold whitespace-nowrap`,
      'transition-[box-shadow,background-color,border-color,color]',
      'disabled:pointer-events-none disabled:opacity-50',
   ),
   {
      variants: {
         variant: {
            default:
               `
                 h-13.75 cursor-pointer rounded-xl border border-primary-500 bg-primary-600 p-4 text-lg leading-none
                 text-neutral-0 shadow-[0_0.5rem_0.5rem_0_rgba(54,122,255,0.03)] hover:bg-primary-500
               `,
            accent:
               `
                 cursor-pointer rounded-xl border border-neutral-200 px-6 text-base leading-none font-semibold
                 text-neutral-600 transition-colors hover:bg-neutral-100
               `,
            link: `
              relative inline-block h-auto p-0 text-base/6 font-semibold text-primary-600 after:absolute after:inset-x-0
              after:bottom-px after:h-px after:bg-current after:content-[''] sm:text-lg
            `,
            'default-with-icon':
               `
                 h-10.5 cursor-pointer rounded-md bg-primary-600 px-5 py-2.5 font-cairo text-sm font-semibold
                 text-[#ebf3ea] hover:bg-primary-500
               `,
            icon: `
              size-10.5 cursor-pointer rounded-lg border border-neutral-250 bg-neutral-0 p-2.5 text-[#515161]
              hover:bg-neutral-100
            `,
            'elips-icon':
               `
                 h-6.75 min-w-13 cursor-pointer rounded-[5.75rem] bg-primary-600 px-1 text-neutral-0
                 hover:bg-primary-500
               `,
            more: `size-8 cursor-pointer rounded-full bg-transparent p-0.75 text-neutral-550 hover:bg-neutral-100`,
            pagination:
               `
                 size-7.5 cursor-pointer rounded-sm border border-neutral-250 bg-neutral-0 p-0 text-sm leading-none
                 font-medium text-neutral-500 shadow-[0_20px_50px_0_rgba(0,0,0,0.12)] hover:border-neutral-450
                 hover:text-neutral-900
               `,
         },
      },
      defaultVariants: {
         variant: 'default',
      },
   },
)
