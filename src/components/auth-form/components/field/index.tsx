import {
   forwardRef,
   useId,
   useState,
   type ChangeEventHandler,
   type ComponentType,
   type SVGProps,
} from 'react'

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
   value: string
   error?: string
   leftIcon: SvgIcon
   rightIcon?: SvgIcon
   activeRightIcon?: SvgIcon
   onChange: ChangeEventHandler<HTMLInputElement>
   onRightIconClick?: (name: string) => void
}

export const Field = forwardRef<HTMLInputElement, AuthFormFieldProps>(
   (
      {
         id,
         label,
         placeholder,
         name,
         type = 'text',
         value,
         error,
         leftIcon: LeftIcon,
         rightIcon: RightIcon,
         activeRightIcon: ActiveRightIcon,
         onChange,
         onRightIconClick,
      },
      ref,
   ) => {
      const [isPasswordVisible, setIsPasswordVisible] = useState(false)
      const errorId = useId()
      const isPasswordField = type === 'password'
      const inputType = isPasswordField && isPasswordVisible ? 'text' : type
      const CurrentRightIcon =
         isPasswordField && isPasswordVisible && ActiveRightIcon
            ? ActiveRightIcon
            : RightIcon

      const handleRightIconClick = () => {
         if (isPasswordField) {
            setIsPasswordVisible((current) => !current)
         }

         onRightIconClick?.(name)
      }

      console.log(LeftIcon)

      return (
         <div className="flex w-full flex-col gap-1.5">
            <Label htmlFor={id} className="text-base leading-6.75 sm:text-lg">
               {label}
            </Label>
            <div className="relative">
               <LeftIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-4 z-10 size-6 -translate-y-1/2"
               />
               <Input
                  ref={ref}
                  id={id}
                  name={name}
                  value={value}
                  type={inputType}
                  placeholder={placeholder}
                  hasError={Boolean(error)}
                  onChange={onChange}
                  aria-describedby={error ? errorId : undefined}
                  className="h-13.75 pr-13 pl-13.5 text-base sm:text-lg"
               />
               {CurrentRightIcon ? (
                  <button
                     title={name}
                     type="button"
                     onClick={handleRightIconClick}
                     className={cn(
                        'absolute top-1/2 -translate-y-1/2 cursor-pointer text-neutral-500 transition-colors hover:text-neutral-900',
                        type === 'text'
                           ? 'right-6 h-4.5 w-4'
                           : 'right-4 size-6',
                     )}
                  >
                     <CurrentRightIcon
                        aria-hidden="true"
                        className="size-full"
                     />
                  </button>
               ) : null}
            </div>
            {error ? (
               <p
                  id={errorId}
                  className="text-danger-500 text-sm leading-5 font-medium"
               >
                  {error}
               </p>
            ) : null}
         </div>
      )
   },
)

Field.displayName = 'Field'
