import SearchIcon from '@/assets/products-page/icons/search.svg?react'
import { Input } from '@/components/ui/input'
import { productsPageData } from '@/data/products-page'

export const ProductsSearch = () => {
   const { title, placeholder, ariaLabel } = productsPageData.search

   return (
      <section className="bg-neutral-0 rounded-2.5 grid h-26.25 grid-cols-[1fr_auto_1fr] items-center px-7.5">
         <h1 className="font-cairo text-2xl leading-none font-bold text-neutral-900">
            {title}
         </h1>
         <div className="col-start-2 flex items-center justify-center">
            <Input
               variant="search"
               startIcon={SearchIcon}
               placeholder={placeholder}
               aria-label={ariaLabel}
               className="w-255.75"
            />
         </div>
      </section>
   )
}
