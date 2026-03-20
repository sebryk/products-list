import { cva } from 'class-variance-authority'

export const variants = cva(
   `w-full transition-[border-color,box-shadow,color] outline-none placeholder:text-neutral-500`,
   {
      variants: {
         variant: {
            default:
               `
                 h-14 rounded-xl border-[1.5px] bg-neutral-0 px-4 py-3 text-lg text-neutral-900 focus-visible:ring-2
                 focus-visible:ring-primary-500/40
               `,
            search:
               `h-12 rounded-lg border border-transparent bg-[#f3f3f3] px-5 py-3 text-sm/6 text-neutral-900`,
         },
      },
      defaultVariants: {
         variant: 'default',
      },
   },
)
