import ArrowsClockwiseIcon from '@/assets/products-page/icons/arrows-clockwise.svg?react'
import PlusCircleIcon from '@/assets/products-page/icons/plus-circle.svg?react'
import { Button } from '@/components/ui/button'
import { productsPageData } from '@/data/products-page'

export const ProductsControlBar = () => {
   const { title, refreshLabel, addButton } = productsPageData.controls

   return (
      <section className="mt-7.5 flex items-center justify-between px-7.5 pt-7.5 pb-10">
         <h2 className="font-cairo text-xl leading-5 font-bold text-neutral-900">
            {title}
         </h2>
         <div className="flex items-center gap-2">
            <Button variant="icon" aria-label={refreshLabel}>
               <ArrowsClockwiseIcon className="size-5.5" />
            </Button>
            <Button variant="default-with-icon">
               <PlusCircleIcon className="size-5.5" />
               <span className="ml-3.75">{addButton}</span>
            </Button>
         </div>
      </section>
   )
}
