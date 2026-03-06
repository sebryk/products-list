import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export { z, zodResolver }

export function createFormSchema<TSchema extends z.ZodType>(schema: TSchema) {
   return schema
}

export type InferFormValues<TSchema extends z.ZodType> = z.infer<TSchema>
