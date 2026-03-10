import { cn } from '@/lib/utils'
import { authPageData } from '@/data/auth-page'
import { Divider } from '@/components/auth-form/components/divider'
import { FooterLink } from '@/components/auth-form/components/footer-link'
import { Field } from '@/components/auth-form/components/field'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

type AuthFormProps = {
   variant: 'login' | 'register'
}

export function AuthForm({ variant }: AuthFormProps) {
   const { title, subtitle, logo, inputs, checkbox, divider, link, button } =
      authPageData[variant]
   const Logo = logo

   return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-8 text-neutral-900 sm:px-6">
         <section
            className={cn(
               `bg-neutral-0 w-full max-w-131.75 rounded-[40px] p-1.5 shadow-[0px_24px_32px_0px_rgba(0,0,0,0.04)]`,
            )}
         >
            <div className="bg-modal-overlay-fade border-gradient rounded-[34px] px-5 py-8 sm:p-12">
               <div className="flex flex-col items-center gap-8">
                  <div className="h-13 w-13 rounded-full shadow-[0px_12px_8px_0px_rgba(0,0,0,0.03)]">
                     <Logo aria-hidden="true" />
                  </div>
                  <div className="flex w-full flex-col items-center gap-3 text-center">
                     <h1 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.015em] text-neutral-900 sm:text-[40px]">
                        {title}
                     </h1>
                     <p className="text-base font-medium text-neutral-500 sm:text-lg">
                        {subtitle}
                     </p>
                  </div>
                  <form className="flex w-full flex-col gap-5 px-2.5">
                     <div className="flex flex-col gap-4">
                        {inputs.map((input) => (
                           <Field
                              key={input.name}
                              id={input.name}
                              label={input.label}
                              placeholder={input.placeholder}
                              type={input.type}
                              name={input.name}
                              leftIcon={input?.leftIcon}
                              rightIcon={input?.rightIcon}
                           />
                        ))}
                     </div>
                     <Checkbox id="remember" label={checkbox} />
                     <div className="flex w-full flex-col gap-4">
                        <Button type="button" className="w-full">
                           {button}
                        </Button>
                        <Divider text={divider} />
                     </div>
                  </form>
                  <FooterLink
                     prefix={link.prefix}
                     text={link.text}
                     to={link.to}
                  />
               </div>
            </div>
         </section>
      </main>
   )
}
