import { useQuery } from '@tanstack/react-query'

import { getProducts, productsQueryKey } from '@/api/products'
import type { ProductsSorting } from '@/data/products-page'

const PRODUCTS_LIST_SELECT = 'id,title,category,brand,sku,rating,price,thumbnail'

export const useProductsQuery = (sorting: ProductsSorting | null) => {
   return useQuery({
      queryKey: [...productsQueryKey, sorting, PRODUCTS_LIST_SELECT],
      queryFn: ({ signal }) =>
         getProducts({
            signal,
            sorting,
            select: PRODUCTS_LIST_SELECT,
         }),
      placeholderData: (previousData) => previousData,
   })
}
