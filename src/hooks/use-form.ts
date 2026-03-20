import { useMutation } from '@tanstack/react-query'
import { useForm as useReactHookForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { login, register as registerUser } from '@/api/auth'
import {
   createFormSchema,
   type InferFormValues,
   z,
   zodResolver,
} from '@/lib/forms'
import { useAuthStore } from '@/stores/auth'

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
   terms?: {
      required: string
   }
}

const loginPattern = /^[A-Za-z0-9]+$/

const createAuthSchema = (errors: AuthFormErrors) =>
   createFormSchema(
      z.object({
         login: z
            .string()
            .min(1, errors.login.required)
            .min(2, errors.login.min)
            .regex(loginPattern, errors.login.pattern),
         password: z
            .string()
            .min(1, errors.password.required)
            .min(4, errors.password.min),
         rememberMe: z.boolean(),
         terms: errors.terms
            ? z.boolean().refine((value) => value, {
                 message: errors.terms.required,
              })
            : z.boolean(),
      }),
   )

type AuthFormSchema = ReturnType<typeof createAuthSchema>
type AuthFormValues = InferFormValues<AuthFormSchema>
type AuthFormVariant = 'login' | 'register'

export const useForm = (variant: AuthFormVariant, errors: AuthFormErrors) => {
   const navigate = useNavigate()
   const setSession = useAuthStore((state) => state.setSession)
   const schema = createAuthSchema(errors)

   const form = useReactHookForm<AuthFormValues>({
      defaultValues: {
         login: '',
         password: '',
         rememberMe: false,
         terms: false,
      },
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      resolver: zodResolver(schema),
   })
   const loginMutation = useMutation({
      mutationFn: login,
   })
   const registerMutation = useMutation({
      mutationFn: registerUser,
   })
   const isPending = loginMutation.isPending || registerMutation.isPending
   const submitError =
      variant === 'login'
         ? loginMutation.error?.message
         : registerMutation.error?.message

   const handleIconClick = (name: string) => {
      if (name !== 'login') return

      form.setValue('login', '', {
         shouldDirty: true,
         shouldTouch: true,
         shouldValidate: false,
      })
   }

   const resetSubmitError = () => {
      loginMutation.reset()
      registerMutation.reset()
   }

   const onSubmit = form.handleSubmit(async (values) => {
      if (variant === 'login') {
         const session = await loginMutation.mutateAsync({
            login: values.login,
            password: values.password,
            rememberMe: values.rememberMe,
         })

         setSession(session)
         navigate('/', { replace: true })

         return
      }

      await registerMutation.mutateAsync({
         login: values.login,
         password: values.password,
      })
      navigate('/auth/login', { replace: true })
   })

   return {
      form,
      onSubmit,
      isPending,
      submitError,
      resetSubmitError,
      isValid: form.formState.isValid,
      watch: form.watch,
      setValue: form.setValue,
      handleIconClick,
      clearErrors: form.clearErrors,
   }
}
