import { Toaster } from 'react-hot-toast'

import { ProductsControlBar } from '@/components/products-control-bar'
import { ProductsSearch } from '@/components/products-search'
import { ProductsTable } from '@/components/products-table'
import { useProductsSelection } from '@/hooks/use-products-selection'
import { useProductsQuery } from '@/hooks/use-products-query'
import { useProductsSorting } from '@/hooks/use-products-sorting'

export function ProductsPage() {
   const { sorting, debouncedSorting, handleSortToggle } = useProductsSorting()
   const { data, isLoading, isError, isFetching, refetch } =
      useProductsQuery(debouncedSorting)
   const { isSelected, isAllSelected, toggleOne, toggleAll } =
      useProductsSelection(data)

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
               data={data}
               isLoading={isLoading}
               isError={isError}
               isFetching={isFetching}
               sorting={sorting}
               onSortToggle={handleSortToggle}
               isAllSelected={isAllSelected}
               onToggleAll={toggleAll}
               isSelected={isSelected}
               onToggleRow={toggleOne}
            />
         </div>
      </main>
   )
}
