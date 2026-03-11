import { TableCheckbox } from '@/components/products-table/checkbox'
import { productsPageData } from '@/data/products-page'

const columnTemplate = 'grid-cols-[35.73%_16.07%_16.07%_16.07%_16.06%]'

export const ProductsTable = () => {
   const {
      table: { columns },
   } = productsPageData

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
         </div>
      </section>
   )
}
