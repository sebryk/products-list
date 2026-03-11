import DotsIcon from '@/assets/products-page/icons/dots.svg?react'
import PlusIcon from '@/assets/products-page/icons/plus.svg?react'
import { TableCheckbox } from '@/components/products-table/checkbox'
import { Button } from '@/components/ui/button'
import { productsPageData } from '@/data/products-page'

const columnTemplate = 'grid-cols-[23.8%_13.1%_17%_13.1%_17%_16%]'

export const ProductsTable = () => {
   const {
      table: { columns, rows },
   } = productsPageData
   const [firstRow] = rows
   const [priceMain, priceFraction = '00'] = firstRow.price.split(',')

   return (
      <section className="px-7.5">
         <div className="bg-neutral-0 rounded-2.5 px-4.5 py-6">
            <div className={`grid items-center ${columnTemplate}`}>
               {columns.map((column, index) => {
                  const isFirstColumn = index === 0

                  return (
                     <div
                        key={column}
                        className={`flex items-center ${isFirstColumn ? 'gap-5' : 'justify-center'}`}
                     >
                        {isFirstColumn && <TableCheckbox />}
                        <span className="text-neutral-550 font-cairo text-base leading-none font-bold">
                           {column}
                        </span>
                     </div>
                  )
               })}
            </div>
            <div className="mt-6 border-y border-neutral-200">
               <div className="h-17.75">
                  <div className={`grid h-full ${columnTemplate} items-center`}>
                     <div className="flex items-center gap-4.5">
                        <TableCheckbox />
                        <div className="flex size-12 shrink-0 rounded-lg border border-[#ececeb] bg-[#c4c4c4]" />
                        <div className="flex min-w-0 flex-col gap-2.5">
                           <span className="font-cairo truncate text-base leading-none font-bold text-[#161919]">
                              {firstRow.name}
                           </span>
                           <span className="font-cairo text-neutral-550 text-sm leading-none font-normal">
                              {firstRow.category}
                           </span>
                        </div>
                     </div>
                     <div className="flex items-center justify-center">
                        <span className="font-open-sans text-base leading-none font-bold text-black">
                           {firstRow.vendor}
                        </span>
                     </div>
                     <div className="flex items-center justify-center">
                        <span className="font-open-sans text-base leading-none font-normal text-black">
                           {firstRow.sku}
                        </span>
                     </div>
                     <div className="flex items-center justify-center">
                        <span className="font-open-sans text-base leading-none font-normal text-black">
                           {firstRow.rating}
                        </span>
                     </div>
                     <div className="flex items-center justify-center">
                        <span className="font-roboto-mono text-base leading-[1.1] font-normal text-[#222222]">
                           {priceMain}
                           <span className="text-neutral-500">
                              ,{priceFraction}
                           </span>
                        </span>
                     </div>
                     <div className="flex items-center justify-center gap-8 pr-10.5">
                        <Button
                           variant="elips-icon"
                           aria-label="Добавить товар"
                        >
                           <PlusIcon className="size-6" />
                        </Button>
                        <Button
                           variant="more"
                           aria-label="Дополнительные действия"
                        >
                           <DotsIcon className="size-8" />
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
