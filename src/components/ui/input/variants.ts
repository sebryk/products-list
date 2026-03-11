import { cva } from 'class-variance-authority'

export const variants = cva(
   'w-full outline-none transition-[border-color,box-shadow,color] placeholder:text-neutral-500',
   {
      variants: {
         variant: {
            default:
               'bg-neutral-0 focus-visible:ring-primary-500/40 h-14 rounded-xl border-[1.5px] px-4 py-3 text-lg text-neutral-900 focus-visible:ring-2',
            search:
               'h-12 rounded-lg border border-transparent bg-[#f3f3f3] px-5 py-3 text-sm leading-6 text-neutral-900',
         },
      },
      defaultVariants: {
         variant: 'default',
      },
   },
)
