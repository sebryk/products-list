import type { ProductListItem } from '@/api/products/types'
import { productsPageData } from '@/data/products-page'

type ProductsDetailsPopoverProps = {
   product: ProductListItem
}

export const ProductsDetailsPopover = ({
   product,
}: ProductsDetailsPopoverProps) => {
   const {
      name,
      description,
      dimensions,
      warranty,
      shipping,
      availability,
   } = product
   const {
      table: {
         detailsPopover: { title, fields },
      },
   } = productsPageData

   return (
      <div className="border-neutral-200 bg-neutral-0 absolute top-full right-0 z-20 mt-3 w-80 rounded-2xl border p-5 shadow-[0_1rem_2rem_0_rgba(0,0,0,0.08)]">
         <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
               <span className="font-cairo text-lg leading-none font-bold text-neutral-1000">
                  {title}
               </span>
               <span className="font-cairo text-base leading-none font-bold text-neutral-900">
                  {name}
               </span>
            </div>
            <div className="flex flex-col gap-3">
               <div className="flex flex-col gap-1.5">
                  <span className="font-open-sans text-sm leading-none font-bold text-neutral-600">
                     {fields.description}
                  </span>
                  <span className="font-open-sans text-sm leading-5 text-neutral-900">
                     {description}
                  </span>
               </div>
               <div className="flex flex-col gap-1.5">
                  <span className="font-open-sans text-sm leading-none font-bold text-neutral-600">
                     {fields.dimensions}
                  </span>
                  <span className="font-open-sans text-sm leading-5 text-neutral-900">
                     {dimensions}
                  </span>
               </div>
               <div className="flex flex-col gap-1.5">
                  <span className="font-open-sans text-sm leading-none font-bold text-neutral-600">
                     {fields.warranty}
                  </span>
                  <span className="font-open-sans text-sm leading-5 text-neutral-900">
                     {warranty}
                  </span>
               </div>
               <div className="flex flex-col gap-1.5">
                  <span className="font-open-sans text-sm leading-none font-bold text-neutral-600">
                     {fields.shipping}
                  </span>
                  <span className="font-open-sans text-sm leading-5 text-neutral-900">
                     {shipping}
                  </span>
               </div>
               <div className="flex flex-col gap-1.5">
                  <span className="font-open-sans text-sm leading-none font-bold text-neutral-600">
                     {fields.availability}
                  </span>
                  <span className="font-open-sans text-sm leading-5 text-neutral-900">
                     {availability}
                  </span>
               </div>
            </div>
         </div>
      </div>
   )
}
