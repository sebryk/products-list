import { productsPageData } from '@/data/products-page'
import {
   useAddProductForm,
   type AddProductFormValues,
} from '@/hooks/use-add-product-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type AddProductFormProps = {
   onCancel: () => void
   onSuccess: () => void
}

export const AddProductForm = ({
   onCancel,
   onSuccess,
}: AddProductFormProps) => {
   const { title, subtitle, inputs, submitButton, cancelButton, errors } =
      productsPageData.controls.addModal
   const { form, onSubmit, clearErrors } = useAddProductForm({
      errors,
      onSuccess,
   })
   const {
      register,
      formState: { errors: formErrors },
   } = form
   const getFieldName = (name: string) => name as keyof AddProductFormValues

   return (
      <div className="flex flex-col gap-8">
         <div className="flex w-full flex-col items-center gap-3 text-center">
            <h2 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.015em] text-neutral-900 sm:text-[40px]">
               {title}
            </h2>
            <p className="text-base font-medium text-neutral-500 sm:text-lg">
               {subtitle}
            </p>
         </div>
         <form
            className="flex w-full flex-col gap-5 px-2.5"
            noValidate={true}
            onSubmit={onSubmit}
         >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
               {inputs.map(({ name, label, placeholder, type }) => {
                  const fieldName = getFieldName(name)
                  const field = register(fieldName)
                  const fieldError = formErrors[fieldName]?.message

                  return (
                     <div key={name} className="flex flex-col gap-1.5">
                        <Label
                           htmlFor={name}
                           className="text-base leading-6.75 sm:text-lg"
                        >
                           {label}
                        </Label>
                        <Input
                           id={name}
                           type={type}
                           placeholder={placeholder}
                           hasError={Boolean(fieldError)}
                           {...field}
                           onChange={(event) => {
                              field.onChange(event)
                              clearErrors(fieldName)
                           }}
                           className="h-13.75 px-5 text-base sm:text-lg"
                        />
                        {fieldError ? (
                           <p className="text-danger-500 text-sm leading-5 font-medium">
                              {fieldError}
                           </p>
                        ) : null}
                     </div>
                  )
               })}
            </div>
            <div className="flex gap-3 pt-2 sm:mt-8 sm:flex-row sm:justify-center">
               <Button type="submit" className="px-8">
                  {submitButton}
               </Button>
               <Button type="button" variant="accent" onClick={onCancel}>
                  {cancelButton}
               </Button>
            </div>
         </form>
      </div>
   )
}
