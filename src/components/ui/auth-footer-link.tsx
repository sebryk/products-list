import { Link } from 'react-router'

type AuthFooterLinkProps = {
   prefix: string
   text: string
   to: string
}

export function AuthFooterLink({ prefix, text, to }: AuthFooterLinkProps) {
   return (
      <p className="text-center text-base leading-6 text-neutral-600 sm:text-lg">
         {`${prefix} `}
         <Link to={to} className="font-semibold text-primary-600 underline decoration-solid">
            {text}
         </Link>
      </p>
   )
}
