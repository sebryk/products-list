import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { AuthCard } from '@/components/ui/auth-card'
import { AuthDivider } from '@/components/ui/auth-divider'
import { AuthFooterLink } from '@/components/ui/auth-footer-link'
import { AuthFormField } from '@/components/ui/auth-form-field'
import { Label } from '@/components/ui/label'
import { authPageData } from '@/data/auth-page'

type AuthVariant = keyof typeof authPageData

type AuthScreenProps = {
   variant: AuthVariant
}

export function AuthScreen({ variant }: AuthScreenProps) {
   const content = authPageData[variant]

   return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-8 text-neutral-900 sm:px-6">
         <AuthCard>
            <div className="flex flex-col items-center gap-8">
               <div className="bg-neutral-0 flex size-13 items-center justify-center rounded-full border border-neutral-200 shadow-[0px_0px_0px_2px_#fff,0px_12px_8px_0px_rgba(0,0,0,0.03)]">
                  <img
                     src={content.logo}
                     alt=""
                     aria-hidden
                     className="h-8.5 w-8.75"
                  />
               </div>
               <div className="flex w-full flex-col items-center gap-3 text-center">
                  <h1 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.015em] text-neutral-900 sm:text-[40px]">
                     {content.title}
                  </h1>
                  <p className="text-base font-medium text-neutral-500 sm:text-lg">
                     {content.subtitle}
                  </p>
               </div>
               <form className="flex w-full flex-col gap-5">
                  <div className="flex flex-col gap-4">
                     {content.inputs.map((input) => (
                        <AuthFormField
                           key={input.name}
                           id={input.name}
                           label={input.label}
                           placeholder={input.placeholder}
                           type={
                              input.name === 'password' ? 'password' : 'text'
                           }
                           leadingIconSrc={input.leftIcon}
                           trailingIconSrc={
                              'rightIcon' in input ? input.rightIcon : undefined
                           }
                        />
                     ))}
                  </div>
                  <div className="flex items-center gap-2.5">
                     <Checkbox id="remember" />
                     <Label
                        htmlFor="remember"
                        className="text-sm font-medium text-neutral-500 sm:text-base"
                     >
                        {content.checkbox}
                     </Label>
                  </div>
                  <div className="flex w-full flex-col gap-4">
                     <Button type="button" className="w-full">
                        {content.button}
                     </Button>
                     <AuthDivider text={content.divider} />
                  </div>
               </form>
               <AuthFooterLink
                  prefix={content.link.prefix}
                  text={content.link.text}
                  to={content.link.to}
               />
            </div>
         </AuthCard>
      </main>
   )
}
