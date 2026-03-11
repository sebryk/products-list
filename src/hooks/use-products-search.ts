import { useSearchParams } from 'react-router'

import { useDebouncedValue } from '@/hooks/use-debounced-value'

const SEARCH_DEBOUNCE_DELAY = 100

export const useProductsSearch = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const search = searchParams.get('q') ?? ''
   const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_DELAY)

   const setSearch = (value: string) => {
      setSearchParams(
         (prev) => {
            const next = new URLSearchParams(prev)
            const trimmedValue = value.trim()

            if (trimmedValue) {
               next.set('q', value)
            } else {
               next.delete('q')
            }

            next.set('page', '1')

            return next
         },
         { replace: true },
      )
   }

   return { search, debouncedSearch, setSearch }
}
