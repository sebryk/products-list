import { useForm as useReactHookForm } from 'react-hook-form'

import {
   createFormSchema,
   type InferFormValues,
   z,
   zodResolver,
} from '@/lib/forms'

type AddProductErrors = {
   name: {
      required: string
      min: string
   }
   category: {
      required: string
      min: string
   }
   vendor: {
      required: string
      min: string
   }
   sku: {
      required: string
      min: string
   }
   price: {
      required: string
      min: string
   }
}

const createAddProductSchema = (errors: AddProductErrors) =>
   createFormSchema(
      z.object({
         name: z.string().min(1, errors.name.required).min(2, errors.name.min),
         category: z
            .string()
            .min(1, errors.category.required)
            .min(2, errors.category.min),
         vendor: z
            .string()
            .min(1, errors.vendor.required)
            .min(2, errors.vendor.min),
         sku: z.string().min(1, errors.sku.required).min(2, errors.sku.min),
         price: z
            .string()
            .min(1, errors.price.required)
            .refine((value) => !Number.isNaN(Number(value)), {
               message: errors.price.required,
            })
            .refine((value) => Number(value) > 0, {
               message: errors.price.min,
            }),
      }),
   )

type AddProductSchema = ReturnType<typeof createAddProductSchema>
export type AddProductFormValues = InferFormValues<AddProductSchema>

type UseAddProductFormProps = {
   errors: AddProductErrors
   onSuccess: () => void
}

export const useAddProductForm = ({
   errors,
   onSuccess,
}: UseAddProductFormProps) => {
   const form = useReactHookForm<AddProductFormValues>({
      defaultValues: {
         name: '',
         category: '',
         vendor: '',
         sku: '',
         price: '',
      },
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      resolver: zodResolver(createAddProductSchema(errors)),
   })

   const onSubmit = form.handleSubmit(() => {
      onSuccess()
      form.reset()
   })

   return {
      form,
      onSubmit,
      clearErrors: form.clearErrors,
   }
}
