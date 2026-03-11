import { ProductsControlBar } from '@/components/products-control-bar'
import { ProductsSearch } from '@/components/products-search'
import { ProductsTable } from '@/components/products-table'

export function ProductsPage() {
   return (
      <main className="min-h-screen bg-neutral-100 pt-5 text-neutral-900">
         <ProductsSearch />
         <div className="bg-neutral-0 mt-7.5">
            <ProductsControlBar />
            <ProductsTable />
         </div>
      </main>
   )
}
