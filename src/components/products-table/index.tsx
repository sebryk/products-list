import { Header } from '@/components/products-table/components/header'
import { Row } from '@/components/products-table/components/row'
import { productsPageData } from '@/data/products-page'

export const ProductsTable = () => {
   const {
      table: { rows },
   } = productsPageData

   return (
      <section className="px-7.5">
         <div className="bg-neutral-0 rounded-2.5 px-4.5 py-6">
            <Header />
            <div className="mt-6 border-y border-neutral-200">
               {rows.map((row) => (
                  <Row
                     key={`${row.sku}-${row.name}`}
                     row={row}
                  />
               ))}
            </div>
         </div>
      </section>
   )
}
