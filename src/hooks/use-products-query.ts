import { useQuery } from '@tanstack/react-query'

import { getProducts, productsQueryKey } from '@/api/products'
import type { ProductsSorting } from '@/data/products-page'

const PRODUCTS_LIST_SELECT =
   'id,title,description,category,brand,sku,rating,price,thumbnail,dimensions,warrantyInformation,shippingInformation,availabilityStatus'

export const useProductsQuery = (
   sorting: ProductsSorting | null,
   page: number,
   search: string,
) => {
   return useQuery({
      queryKey: [...productsQueryKey, sorting, page, search, PRODUCTS_LIST_SELECT],
      queryFn: ({ signal }) =>
         getProducts({
            signal,
            page,
            search,
            sorting,
            select: PRODUCTS_LIST_SELECT,
         }),
      placeholderData: (previousData) => previousData,
   })
}
