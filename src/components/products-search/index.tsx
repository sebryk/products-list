import SearchIcon from '@/assets/products-page/icons/search.svg?react'
import { Input } from '@/components/ui/input'
import { productsPageData } from '@/data/products-page'

type ProductsSearchProps = {
   value: string
   onChange: (value: string) => void
}

export const ProductsSearch = ({ value, onChange }: ProductsSearchProps) => {
   const { title, placeholder, ariaLabel } = productsPageData.search

   return (
      <section
         className="mt-6 grid h-26.25 grid-cols-[1fr_auto_1fr] items-center bg-neutral-0 px-[7.5px]"
      >
         <h1
            className="font-cairo text-2xl leading-none font-bold text-neutral-900"
         >
            {title}
         </h1>
         <div
            className="col-start-2 flex items-center justify-center"
         >
            <Input
               variant="search"
               startIcon={SearchIcon}
               placeholder={placeholder}
               aria-label={ariaLabel}
               value={value}
               onChange={(event) => onChange(event.target.value)}
               className="w-255.75"
            />
         </div>
      </section>
   )
}
