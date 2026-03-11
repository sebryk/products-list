import SortArrowIcon from '@/assets/products-page/icons/sort-arrow.svg?react'
import { TableCheckbox } from '@/components/products-table/components/checkbox'
import {
   productsPageData,
   type ProductsSorting,
   type ProductsTableColumn,
} from '@/data/products-page'

type HeaderProps = {
   sorting: ProductsSorting | null
   onSortToggle: (column: ProductsTableColumn) => void
}

export const Header = ({ sorting, onSortToggle }: HeaderProps) => {
   const {
      table: { columnTemplate, columns },
   } = productsPageData

   return (
      <div className={`grid items-center ${columnTemplate}`}>
         {columns.map((column, index) => {
            const isFirstColumn = index === 0
            const isActive = sorting?.sortBy === column.sortBy
            const isDescending = sorting?.order === 'desc'

            return (
               <div
                  key={column.key}
                  className={`flex items-center ${isFirstColumn ? 'gap-5' : 'justify-center'}`}
               >
                  {isFirstColumn && <TableCheckbox />}
                  <button
                     type="button"
                     onClick={() => onSortToggle(column)}
                     className={`inline-flex cursor-pointer items-center gap-1.5 transition-colors ${isActive ? 'text-primary-600' : 'text-neutral-550 hover:text-neutral-900'}`}
                  >
                     <span className="font-cairo text-base leading-none font-bold">
                        {column.label}
                     </span>
                     <SortArrowIcon
                        className={`size-4 shrink-0 transition-transform ${isActive ? 'opacity-100' : 'opacity-0'} ${isDescending ? 'rotate-180' : ''}`}
                     />
                  </button>
               </div>
            )
         })}
      </div>
   )
}
