import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useSearchParams } from 'react-router'

import { ProductsControlBar } from '@/components/products-control-bar'
import { ProductsSearch } from '@/components/products-search'
import { ProductsTable } from '@/components/products-table'
import { useProductsPagination } from '@/hooks/use-products-pagination'
import { useProductsSelection } from '@/hooks/use-products-selection'
import { useProductsQuery } from '@/hooks/use-products-query'
import { useProductsSearch } from '@/hooks/use-products-search'
import { useProductsSorting } from '@/hooks/use-products-sorting'

export function ProductsPage() {
   const [, setSearchParams] = useSearchParams()
   const { sorting, debouncedSorting, handleSortToggle, resetSorting } =
      useProductsSorting()
   const { page, setPage } = useProductsPagination()
   const { search, debouncedSearch, setSearch } = useProductsSearch()
   const { data, isLoading, isError, isFetching, refetch } = useProductsQuery(
      debouncedSorting,
      page,
      debouncedSearch,
   )
   const { isSelected, isAllSelected, toggleOne, toggleAll, clearSelection } =
      useProductsSelection(data?.items)

   const handlePageChange = (nextPage: number) => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setPage(nextPage)
   }

   const handleRefresh = () => {
      const isInitialState = page === 1 && !search.trim() && !sorting

      clearSelection()
      resetSorting()

      if (isInitialState) {
         void refetch()
         return
      }

      setSearchParams(new URLSearchParams(), { replace: true })
   }

   useEffect(() => {
      if (!data?.totalPages || page <= data.totalPages) {
         return
      }

      setPage(data.totalPages, true)
   }, [data?.totalPages, page, setPage])

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
         <ProductsSearch value={search} onChange={setSearch} />
         <div className="bg-neutral-0 mt-7.5">
            <ProductsControlBar
               isFetching={isFetching}
               onRefresh={handleRefresh}
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
