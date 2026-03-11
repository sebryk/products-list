import { useQuery } from '@tanstack/react-query'

import { getProducts, productsQueryKey } from '@/api/products'

export const useProductsQuery = () => {
   return useQuery({
      queryKey: productsQueryKey,
      queryFn: getProducts,
   })
}
