import DotsIcon from '@/assets/products-page/icons/dots.svg?react'
import PlusIcon from '@/assets/products-page/icons/plus.svg?react'
import { TableCheckbox } from '@/components/products-table/components/checkbox'
import { Button } from '@/components/ui/button'
import {
   productsPageData,
   type ProductsTableRow as ProductsTableRowData,
} from '@/data/products-page'

type ProductsTableRowProps = {
   row: ProductsTableRowData
}

export const Row = ({ row }: ProductsTableRowProps) => {
   const { name, category, vendor, sku, rating, price } = row
   const {
      table: { columnTemplate },
   } = productsPageData
   const [priceMain, priceFraction = '00'] = price.split(',')

   return (
      <div className="h-17.75">
         <div className={`grid h-full ${columnTemplate} items-center`}>
            <div className="flex items-center gap-4.5">
               <TableCheckbox />
               <div className="border-neutral-250 bg-neutral-450 flex size-12 shrink-0 rounded-lg border" />
               <div className="flex w-52.5 min-w-0 flex-col gap-2.5">
                  <span className="text-neutral-1000 font-cairo truncate whitespace-nowrap text-base leading-none font-bold">
                     {name}
                  </span>
                  <span className="font-cairo text-neutral-550 truncate whitespace-nowrap text-sm leading-none font-normal">
                     {category}
                  </span>
               </div>
            </div>
            <div className="flex items-center justify-center">
               <span className="text-neutral-1000 font-open-sans text-base leading-none font-bold">
                  {vendor}
               </span>
            </div>
            <div className="flex items-center justify-center">
               <span className="text-neutral-1000 font-open-sans text-base leading-none font-normal">
                  {sku}
               </span>
            </div>
            <div className="flex items-center justify-center">
               <span className="text-neutral-1000 font-open-sans text-base leading-none font-normal">
                  {rating}
               </span>
            </div>
            <div className="flex items-center justify-center">
               <span className="text-neutral-920 font-roboto-mono text-base leading-[1.1] font-normal">
                  {priceMain}
                  <span className="text-neutral-500">,{priceFraction}</span>
               </span>
            </div>
            <div className="flex items-center justify-center gap-8 pr-10.5">
               <Button variant="elips-icon" aria-label="Добавить товар">
                  <PlusIcon className="size-6" />
               </Button>
               <Button variant="more" aria-label="Дополнительные действия">
                  <DotsIcon className="size-8" />
               </Button>
            </div>
         </div>
      </div>
   )
}
