import { Header } from '@/components/products-table/components/header'
import { Progress } from '@/components/ui/progress'
import { Pagination } from '@/components/ui/pagination'
import { Row } from '@/components/products-table/components/row'
import { RowSkeleton } from '@/components/products-table/components/row/components/skeleton'
import type { ProductListItem } from '@/api/products/types'
import { productsPageData } from '@/data/products-page'
import type { ProductsSorting, ProductsTableColumn } from '@/data/products-page'

type ProductsTableProps = {
   data: ProductListItem[] | undefined
   page: number
   total: number
   limit: number
   totalPages: number
   hasNextPage: boolean
   isLoading: boolean
   isError: boolean
   isFetching: boolean
   sorting: ProductsSorting | null
   onSortToggle: (column: ProductsTableColumn) => void
   onPageChange: (page: number) => void
   isAllSelected: boolean
   onToggleAll: () => void
   isSelected: (id: number) => boolean
   onToggleRow: (id: number) => void
}

export const ProductsTable = ({
   data,
   page,
   total,
   limit,
   totalPages,
   hasNextPage,
   isLoading,
   isError,
   isFetching,
   sorting,
   onSortToggle,
   onPageChange,
   isAllSelected,
   onToggleAll,
   isSelected,
   onToggleRow,
}: ProductsTableProps) => {
   const {
      table: { loadingRowsCount, errorMessage, pagination },
   } = productsPageData
   const shownFrom = total === 0 ? 0 : (page - 1) * limit + 1
   const shownTo =
      total === 0
         ? 0
         : Math.min((page - 1) * limit + (data?.length ?? 0), total)

   return (
      <section className="px-7.5">
         <div className="rounded-sm bg-neutral-0 py-6">
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
                     <span className="font-cairo text-base leading-none font-bold text-danger-500">
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
            <div className="mt-12.75 flex items-center justify-between gap-6">
               <p className="font-cairo text-[18px] leading-none text-neutral-400">
                  {pagination.shownLabel}{' '}
                  <span className="text-neutral-900">
                     {shownFrom}-{shownTo}
                  </span>{' '}
                  {pagination.totalLabel}{' '}
                  <span className="text-neutral-900">{total}</span>
               </p>
               <Pagination
                  page={page}
                  totalPages={totalPages}
                  hasNextPage={hasNextPage}
                  onPageChange={onPageChange}
               />
            </div>
         </div>
      </section>
   )
}
