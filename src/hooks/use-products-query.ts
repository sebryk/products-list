import { useQuery } from '@tanstack/react-query'

import { getProducts, productsQueryKey } from '@/api/products'
import type { ProductsSorting } from '@/data/products-page'

export const useProductsQuery = (sorting: ProductsSorting | null) => {
   return useQuery({
      queryKey: [...productsQueryKey, sorting],
      queryFn: ({ signal }) => getProducts({ signal, sorting }),
      placeholderData: (previousData) => previousData,
   })
}
