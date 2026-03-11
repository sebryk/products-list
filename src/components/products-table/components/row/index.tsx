import DotsIcon from '@/assets/products-page/icons/dots.svg?react'
import MinusIcon from '@/assets/products-page/icons/minus.svg?react'
import PlusIcon from '@/assets/products-page/icons/plus.svg?react'
import { ProductsDetailsPopover } from '@/components/products-details-popover'
import { TableCheckbox } from '@/components/products-table/components/checkbox'
import { Button } from '@/components/ui/button'
import {
   productsPageData,
   type ProductsTableRow as ProductsTableRowData,
} from '@/data/products-page'
import { useModal } from '@/hooks/use-modal'

type ProductsTableRowProps = {
   row: ProductsTableRowData
   isSelected: boolean
   onToggle: () => void
}

export const Row = ({ row, isSelected, onToggle }: ProductsTableRowProps) => {
   const { thumbnail, name, category, vendor, sku, rating, price } = row
   const {
      table: { columnTemplate },
   } = productsPageData
   const [priceMain, priceFraction = '00'] = price.split(',')
   const [ratingMain, ratingSuffix = ''] = rating.split('/')
   const ratingValue = Number.parseFloat(ratingMain)
   const isLowRating = !Number.isNaN(ratingValue) && ratingValue < 3
   const { isOpen, openModal, closeModal } = useModal()

   return (
      <div className="relative h-17.75 px-4.5">
         {isSelected && (
            <span
               aria-hidden="true"
               className="bg-secondary-500 absolute top-0 left-0 h-17.75 w-0.75"
            />
         )}
         <div className={`grid h-full ${columnTemplate} items-center`}>
            <div className="flex items-center gap-4.5">
               <TableCheckbox
                  checked={isSelected}
                  onChange={onToggle}
                  ariaLabel={`Выбрать товар ${name}`}
               />
               {thumbnail ? (
                  <img
                     src={thumbnail}
                     alt=""
                     className="border-neutral-250 size-12 shrink-0 rounded-lg border object-cover"
                  />
               ) : (
                  <div className="border-neutral-250 bg-neutral-450 flex size-12 shrink-0 rounded-lg border" />
               )}
               <div className="flex w-52.5 min-w-0 flex-col gap-2.5">
                  <span className="text-neutral-1000 font-cairo truncate text-base leading-none font-bold whitespace-nowrap">
                     {name}
                  </span>
                  <span className="font-cairo text-neutral-550 truncate text-sm leading-[1.2] font-normal whitespace-nowrap">
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
               <span className="font-open-sans text-neutral-1000 text-base leading-none font-normal">
                  <span className={isLowRating ? 'text-danger-500' : ''}>
                     {ratingMain}
                  </span>
                  {ratingSuffix ? `/${ratingSuffix}` : ''}
               </span>
            </div>
            <div className="flex items-center justify-center">
               <span className="text-neutral-920 font-roboto-mono text-base leading-[1.1] font-normal">
                  {priceMain}
                  <span className="text-neutral-500">,{priceFraction}</span>
               </span>
            </div>
            <div className="flex items-center justify-center gap-8 pr-10.5">
               <Button variant="elips-icon" onClick={() => onToggle()}>
                  {isSelected ? (
                     <MinusIcon className="size-6" />
                  ) : (
                     <PlusIcon className="size-6" />
                  )}
               </Button>

               <Button
                  variant="more"
                  onMouseEnter={openModal}
                  onMouseLeave={closeModal}
               >
                  <DotsIcon className="size-8" />
               </Button>
               {isOpen && <ProductsDetailsPopover product={row} />}
            </div>
         </div>
      </div>
   )
}
