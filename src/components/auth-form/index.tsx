import { cn } from '@/lib/utils'
import { authPageData } from '@/data/auth-page'
import { useForm } from '@/hooks/use-form'
import { Divider } from '@/components/auth-form/components/divider'
import { Field } from '@/components/auth-form/components/field'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

type AuthFormProps = {
   variant: 'login' | 'register'
}

export const AuthForm = ({ variant }: AuthFormProps) => {
   const isRegisterForm = variant === 'register'
   const {
      title,
      subtitle,
      logo,
      inputs,
      errors,
      checkbox,
      checkboxError,
      divider,
      link,
      button,
   } = authPageData[variant]
   const Logo = logo
   const formErrorsConfig = {
      ...errors,
      terms: isRegisterForm ? { required: checkboxError } : undefined,
   }
   const {
      form,
      onSubmit,
      watch,
      handleIconClick,
      clearErrors,
      isPending,
      submitError,
      resetSubmitError,
   } = useForm(variant, formErrorsConfig)
   const {
      register: registerField,
      formState: { errors: formErrors },
   } = form
   const checkboxFieldName = isRegisterForm ? 'terms' : 'rememberMe'
   const checkboxField = registerField(checkboxFieldName)
   const { ref: checkboxRef, ...checkboxInputProps } = checkboxField

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
                  <form
                     className="flex w-full flex-col gap-5 px-2.5"
                     noValidate={true}
                     onSubmit={onSubmit}
                  >
                     <div className="flex flex-col gap-4">
                        {inputs.map((input) => {
                           const field = registerField(input.name)
                           const { ref: fieldRef, ...fieldProps } = field
                           const normalizedValue = watch(input.name) ?? ''
                           const hasValue = normalizedValue.length > 0
                           const rightIcon = hasValue
                              ? input.rightIcon
                              : undefined
                           const activeRightIcon = hasValue
                              ? input.activeRightIcon
                              : undefined

                           return (
                              <Field
                                 key={input.name}
                                 ref={fieldRef}
                                 id={input.name}
                                 label={input.label}
                                 placeholder={input.placeholder}
                                 type={input.type}
                                 name={fieldProps.name}
                                 value={normalizedValue}
                                 error={formErrors[input.name]?.message}
                                 leftIcon={input.leftIcon}
                                 rightIcon={rightIcon}
                                 activeRightIcon={activeRightIcon}
                                 onChange={(event) => {
                                    fieldProps.onChange(event)
                                    clearErrors(input.name)
                                    if (submitError) {
                                       resetSubmitError()
                                    }
                                 }}
                                 onRightIconClick={handleIconClick}
                              />
                           )
                        })}
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <Checkbox
                           id={checkboxFieldName}
                           label={checkbox}
                           name={checkboxInputProps.name}
                           ref={checkboxRef}
                           disabled={isPending}
                           onChange={(event) => {
                              checkboxInputProps.onChange(event)
                              clearErrors(checkboxFieldName)
                              if (submitError) {
                                 resetSubmitError()
                              }
                           }}
                        />
                        {formErrors[checkboxFieldName]?.message ? (
                           <p className="text-danger-500 text-sm leading-5 font-medium">
                              {formErrors[checkboxFieldName]?.message}
                           </p>
                        ) : null}
                     </div>
                     {submitError ? (
                        <div
                           role="alert"
                           aria-live="polite"
                           className="border-danger-500/20 bg-danger-500/8 rounded-2xl border px-4 py-3"
                        >
                           <p className="text-danger-500 text-sm leading-5 font-medium">
                              {submitError}
                           </p>
                        </div>
                     ) : null}
                     <div className="flex w-full flex-col gap-4">
                        <Button
                           type="submit"
                           className="w-full"
                           disabled={isPending}
                        >
                           {button}
                        </Button>
                        <Divider text={divider} />
                     </div>
                  </form>
                  <p className="z-10 text-center text-base leading-6 text-neutral-600 sm:text-lg">
                     {`${link.prefix} `}
                     <Button href={link.to} variant="link">
                        {link.text}
                     </Button>
                  </p>
               </div>
            </div>
         </section>
      </main>
   )
}
