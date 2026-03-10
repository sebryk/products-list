import { useForm as useReactHookForm } from 'react-hook-form'

import {
   createFormSchema,
   type InferFormValues,
   z,
   zodResolver,
} from '@/lib/forms'

type AuthFormErrors = {
   login: {
      required: string
      min: string
      pattern: string
   }
   password: {
      required: string
      min: string
      pattern: string
   }
}

const loginPattern = /^[A-Za-z0-9]+$/
const passwordLetterPattern = /[A-Za-z]/
const passwordDigitPattern = /\d/

function createAuthSchema(errors: AuthFormErrors) {
   return createFormSchema(
      z.object({
         login: z
            .string()
            .min(1, errors.login.required)
            .min(2, errors.login.min)
            .regex(loginPattern, errors.login.pattern),
         password: z
            .string()
            .min(1, errors.password.required)
            .min(8, errors.password.min)
            .refine(
               (value) =>
                  passwordLetterPattern.test(value) &&
                  passwordDigitPattern.test(value),
               {
                  message: errors.password.pattern,
               },
            ),
      }),
   )
}

type AuthFormSchema = ReturnType<typeof createAuthSchema>
export type AuthFormValues = InferFormValues<AuthFormSchema>

export function useForm(errors: AuthFormErrors) {
   const schema = createAuthSchema(errors)

   const form = useReactHookForm<AuthFormValues>({
      defaultValues: {
         login: '',
         password: '',
      },
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      resolver: zodResolver(schema),
   })

   const handleIconClick = (name: string) => {
      if (name !== 'login') return

      form.setValue('login', '', {
         shouldDirty: true,
         shouldTouch: true,
         shouldValidate: false,
      })
   }

   return {
      form,
      handleSubmit: form.handleSubmit,
      isValid: form.formState.isValid,
      watch: form.watch,
      setValue: form.setValue,
      handleIconClick,
      clearErrors: form.clearErrors,
   }
}
