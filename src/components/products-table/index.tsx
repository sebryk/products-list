import { Header } from '@/components/products-table/components/header'
import { Progress } from '@/components/ui/progress'
import { Row } from '@/components/products-table/components/row'
import { RowSkeleton } from '@/components/products-table/components/row/components/skeleton'
import type { ProductListItem } from '@/api/products/types'
import { productsPageData } from '@/data/products-page'
import type { ProductsSorting, ProductsTableColumn } from '@/data/products-page'

type ProductsTableProps = {
   data: ProductListItem[] | undefined
   isLoading: boolean
   isError: boolean
   isFetching: boolean
   sorting: ProductsSorting | null
   onSortToggle: (column: ProductsTableColumn) => void
   isAllSelected: boolean
   onToggleAll: () => void
   isSelected: (id: number) => boolean
   onToggleRow: (id: number) => void
}

export const ProductsTable = ({
   data,
   isLoading,
   isError,
   isFetching,
   sorting,
   onSortToggle,
   isAllSelected,
   onToggleAll,
   isSelected,
   onToggleRow,
}: ProductsTableProps) => {
   const {
      table: { loadingRowsCount, errorMessage },
   } = productsPageData

   return (
      <section className="px-7.5">
         <div className="bg-neutral-0 rounded-2.5 py-6">
            <Header
               sorting={sorting}
               onSortToggle={onSortToggle}
               isAllSelected={isAllSelected}
               onToggleAll={onToggleAll}
            />
            <div className="relative mt-6">
               <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
                  <Progress isActive={isFetching} />
               </div>
               {isLoading ? (
                  <div className="border-y border-neutral-200">
                     {Array.from({ length: loadingRowsCount }).map(
                        (_, index) => (
                           <div
                              key={index}
                              className="border-b border-neutral-200 last:border-b-0"
                           >
                              <RowSkeleton />
                           </div>
                        ),
                     )}
                  </div>
               ) : isError ? (
                  <div className="border-y border-neutral-200 py-8 text-center">
                     <span className="text-danger-500 font-cairo text-base leading-none font-bold">
                        {errorMessage}
                     </span>
                  </div>
               ) : (
                  <div className="border-y border-neutral-200">
                     {data?.map((row) => (
                        <div
                           key={row.id}
                           className="border-b border-neutral-200 last:border-b-0"
                        >
                           <Row
                              row={row}
                              isSelected={isSelected(row.id)}
                              onToggle={() => onToggleRow(row.id)}
                           />
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </section>
   )
}
