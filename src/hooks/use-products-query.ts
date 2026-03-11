import { useQuery } from '@tanstack/react-query'

import { getProducts, productsQueryKey } from '@/api/products'
import type { ProductsSorting } from '@/data/products-page'

const PRODUCTS_LIST_SELECT =
   'id,title,description,category,brand,sku,rating,price,thumbnail,dimensions,warrantyInformation,shippingInformation,availabilityStatus'

export const useProductsQuery = (
   sorting: ProductsSorting | null,
   page: number,
) => {
   return useQuery({
      queryKey: [...productsQueryKey, sorting, page, PRODUCTS_LIST_SELECT],
      queryFn: ({ signal }) =>
         getProducts({
            signal,
            page,
            sorting,
            select: PRODUCTS_LIST_SELECT,
         }),
      placeholderData: (previousData) => previousData,
   })
}
