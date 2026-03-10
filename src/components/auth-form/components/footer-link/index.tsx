import { Link } from 'react-router'

type AuthFooterLinkProps = {
   prefix: string
   text: string
   to: string
}

export function FooterLink({ prefix, text, to }: AuthFooterLinkProps) {
   return (
      <p className="z-10 text-center text-base leading-6 text-neutral-600 sm:text-lg">
         {`${prefix} `}
         <Link
            to={to}
            className="text-primary-600 relative inline-block font-semibold after:absolute after:right-0 after:bottom-px after:left-0 after:h-px after:bg-current after:content-['']"
         >
            {text}
         </Link>
      </p>
   )
}
