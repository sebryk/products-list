import type { ComponentType, SVGProps } from 'react'

import { Input } from '@/components/ui/input/'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>

type AuthFormFieldProps = {
   id: string
   label: string
   placeholder: string
   name: string
   type: string
   leftIcon: SvgIcon
   rightIcon?: SvgIcon
}

export function Field({
   id,
   label,
   placeholder,
   type = 'text',
   leftIcon: LeftIcon,
   rightIcon: RightIcon,
}: AuthFormFieldProps) {
   return (
      <div className="flex w-full flex-col gap-1.5">
         <Label htmlFor={id} className="text-base leading-6.75 sm:text-lg">
            {label}
         </Label>
         <div className="relative">
            <LeftIcon
               aria-hidden="true"
               className="pointer-events-none absolute top-1/2 left-4 size-6 -translate-y-1/2"
            />
            <Input
               id={id}
               type={type}
               placeholder={placeholder}
               className="h-13.75 pr-13 pl-13.5 text-base sm:text-lg"
            />
            {RightIcon ? (
               <RightIcon
                  aria-hidden="true"
                  className={cn(
                     'pointer-events-none absolute top-1/2 -translate-y-1/2',
                     type === 'text' ? 'right-6 h-4.5 w-4' : 'right-4 size-6',
                  )}
               />
            ) : null}
         </div>
      </div>
   )
}
