import { TableCheckbox } from '@/components/products-table/components/checkbox'
import { productsPageData } from '@/data/products-page'

export const Header = () => {
   const {
      table: { columnTemplate, columns },
   } = productsPageData

   return (
      <div className={`grid items-center ${columnTemplate}`}>
         {columns.map(({ key, label }, index) => {
            const isFirstColumn = index === 0

            return (
               <div
                  key={key}
                  className={`flex items-center ${isFirstColumn ? 'gap-5' : 'justify-center'}`}
               >
                  {isFirstColumn && <TableCheckbox />}
                  <span className="text-neutral-550 font-cairo text-base leading-none font-bold">
                     {label}
                  </span>
               </div>
            )
         })}
      </div>
   )
}
