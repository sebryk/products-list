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
               'bg-primary-600 rounded-xl text-neutral-0 shadow-[0px_8px_8px_0px_rgba(54,122,255,0.03)] cursor-pointer border border-primary-500 hover:bg-primary-500 h-[55px] px-4 py-4 text-lg leading-none',
            link: "text-primary-600 h-auto p-0 text-base leading-6 sm:text-lg relative inline-block font-semibold after:absolute after:right-0 after:bottom-px after:left-0 after:h-px after:bg-current after:content-['']",
            productsAction:
               'h-[42px] cursor-pointer rounded-md bg-primary-600 px-5 py-2.5 font-cairo text-sm font-semibold text-[#ebf3ea] hover:bg-primary-500',
            productsIcon:
               'h-[42px] w-[42px] cursor-pointer rounded-lg border border-[#ececeb] bg-neutral-0 p-2.5 text-[#515161] hover:bg-neutral-100',
         },
      },
      defaultVariants: {
         variant: 'default',
      },
   },
)
