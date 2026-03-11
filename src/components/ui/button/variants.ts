import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

export const variants = cva(
   cn(
      'z-10 inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold',
      'transition-[box-shadow,background-color,border-color,color]',
      'disabled:pointer-events-none disabled:opacity-50',
   ),
   {
      variants: {
         variant: {
            default:
               'bg-primary-600 rounded-xl text-neutral-0 shadow-[0_0.5rem_0.5rem_0_rgba(54,122,255,0.03)] cursor-pointer border border-primary-500 hover:bg-primary-500 h-13.75 px-4 py-4 text-lg leading-none',
            link: "text-primary-600 h-auto p-0 text-base leading-6 sm:text-lg relative inline-block font-semibold after:absolute after:right-0 after:bottom-px after:left-0 after:h-px after:bg-current after:content-['']",
            'default-with-icon':
               'h-10.5 cursor-pointer rounded-md bg-primary-600 px-5 py-2.5 font-cairo text-sm font-semibold text-[#ebf3ea] hover:bg-primary-500',
            icon: 'size-10.5 cursor-pointer rounded-lg border border-[#ececeb] bg-neutral-0 p-2.5 text-[#515161] hover:bg-neutral-100',
            'elips-icon':
               'h-6.75 min-w-13 cursor-pointer rounded-[5.75rem] bg-primary-600 px-1 text-neutral-0 hover:bg-primary-500',
            more: 'size-8 p-[3px] cursor-pointer rounded-full bg-transparent text-neutral-550 hover:bg-neutral-100',
         },
      },
      defaultVariants: {
         variant: 'default',
      },
   },
)
