import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type AuthFormFieldProps = {
   id: string
   label: string
   placeholder: string
   type?: 'text' | 'password'
   leadingIconSrc: string
   trailingIconSrc?: string
}

export function AuthFormField({
   id,
   label,
   placeholder,
   type = 'text',
   leadingIconSrc,
   trailingIconSrc,
}: AuthFormFieldProps) {
   return (
      <div className="flex w-full flex-col gap-1.5">
         <Label htmlFor={id} className="text-base sm:text-lg">
            {label}
         </Label>
         <div className="relative">
            <img src={leadingIconSrc} alt="" aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-6 -translate-y-1/2" />
            <Input
               id={id}
               type={type}
               placeholder={placeholder}
               className="pl-[54px] pr-[52px] text-base sm:text-lg"
            />
            {trailingIconSrc ? (
               <img
                  src={trailingIconSrc}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-1/2 size-6 -translate-y-1/2"
               />
            ) : null}
         </div>
      </div>
   )
}
