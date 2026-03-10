import type { ComponentProps } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { Link } from 'react-router'

import { cn } from '@/lib/utils'
import { variants } from './variants'

type ButtonAsButton = ComponentProps<'button'> & { href?: never }
type ButtonAsLink = Omit<ComponentProps<typeof Link>, 'to'> & {
   href: string
   type?: never
}
type ButtonProps = VariantProps<typeof variants> &
   (ButtonAsButton | ButtonAsLink)

export const Button = ({ className, variant, ...props }: ButtonProps) => {
   const classNameProps = cn(variants({ variant, className }))
   if ('href' in props && props.href) {
      const { href, ...linkProps } = props

      return (
         <Link
            to={href}
            data-slot="button-link"
            className={classNameProps}
            {...linkProps}
         />
      )
   }

   const { type = 'button', ...buttonProps } = props as ComponentProps<'button'>

   return (
      <button
         type={type}
         data-slot="button"
         className={classNameProps}
         {...buttonProps}
      />
   )
}
