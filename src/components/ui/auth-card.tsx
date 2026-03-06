import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type AuthCardProps = {
   className?: string
   children: ReactNode
}

export function AuthCard({ className, children }: AuthCardProps) {
   return (
      <section
         className={cn(
            'bg-neutral-0 w-full max-w-[527px] rounded-[40px] p-1.5 shadow-[0px_24px_32px_0px_rgba(0,0,0,0.04)]',
            className,
         )}
      >
         <div className="rounded-[34px] border border-neutral-200 bg-gradient-to-b from-[rgba(35,35,35,0.03)] to-[rgba(35,35,35,0)] px-5 py-8 sm:px-12 sm:py-12">
            {children}
         </div>
      </section>
   )
}
