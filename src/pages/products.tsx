import { useCallback, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import { ProductsControlBar } from '@/components/products-control-bar'
import { ProductsSearch } from '@/components/products-search'
import { ProductsTable } from '@/components/products-table'
import { useProductsPagination } from '@/hooks/use-products-pagination'
import { useProductsSelection } from '@/hooks/use-products-selection'
import { useProductsQuery } from '@/hooks/use-products-query'
import { useProductsSorting } from '@/hooks/use-products-sorting'

export function ProductsPage() {
   const { sorting, debouncedSorting, handleSortToggle } = useProductsSorting()
   const { page, setPage } = useProductsPagination()
   const { data, isLoading, isError, isFetching, refetch } = useProductsQuery(
      debouncedSorting,
      page,
   )
   const { isSelected, isAllSelected, toggleOne, toggleAll } =
      useProductsSelection(data?.items)

   const handlePageChange = (nextPage: number) => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setPage(nextPage)
   }

   useEffect(() => {
      if (!data?.totalPages || page <= data.totalPages) {
         return
      }

      setPage(data.totalPages, true)
   }, [data?.totalPages, page])

   return (
      <main className="min-h-screen bg-neutral-100 pt-5 text-neutral-900">
         <Toaster
            position="top-right"
            gutter={12}
            containerStyle={{
               top: 24,
               right: 24,
            }}
            toastOptions={{
               duration: 3000,
            }}
         />
         <ProductsSearch />
         <div className="bg-neutral-0 mt-7.5">
            <ProductsControlBar
               isFetching={isFetching}
               onRefresh={() => {
                  void refetch()
               }}
            />
            <ProductsTable
               data={data?.items}
               page={page}
               total={data?.total ?? 0}
               limit={data?.limit ?? 0}
               totalPages={data?.totalPages ?? 0}
               hasNextPage={data?.hasNextPage ?? false}
               isLoading={isLoading}
               isError={isError}
               isFetching={isFetching}
               sorting={sorting}
               onSortToggle={handleSortToggle}
               onPageChange={handlePageChange}
               isAllSelected={isAllSelected}
               onToggleAll={toggleAll}
               isSelected={isSelected}
               onToggleRow={toggleOne}
            />
         </div>
      </main>
   )
}
