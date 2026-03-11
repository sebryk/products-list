import { ProductsControlBar } from '@/components/products-control-bar'
import { ProductsSearch } from '@/components/products-search'
import { ProductsTable } from '@/components/products-table'
import { useProductsQuery } from '@/hooks/use-products-query'
import { useProductsSorting } from '@/hooks/use-products-sorting'

export function ProductsPage() {
   const { sorting, debouncedSorting, handleSortToggle } =
      useProductsSorting()
   const { data, isLoading, isError, isFetching, refetch } =
      useProductsQuery(debouncedSorting)

   return (
      <main className="min-h-screen bg-neutral-100 pt-5 text-neutral-900">
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
            />
         </div>
      </main>
   )
}
