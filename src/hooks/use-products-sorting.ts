import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router'

import { productsSortFields } from '@/api/products'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import type {
   ProductsSortOrder,
   ProductsSorting,
   ProductsTableColumn,
} from '@/data/products-page'

const SORT_DEBOUNCE_DELAY = 180
const PRODUCTS_SORTING_STORAGE_KEY = 'aiti-guru.products-sorting'

const isSortOrder = (value: string | null): value is ProductsSortOrder =>
   value === 'asc' || value === 'desc'

const isSortField = (
   value: string | null,
): value is (typeof productsSortFields)[number] =>
   value !== null &&
   productsSortFields.includes(value as (typeof productsSortFields)[number])

const parseSorting = (
   searchParams: URLSearchParams,
): ProductsSorting | null => {
   const sortBy = searchParams.get('sortBy')
   const order = searchParams.get('order')

   if (!isSortField(sortBy) || !isSortOrder(order)) return null

   return { sortBy, order }
}

const parseStoredSorting = (): ProductsSorting | null => {
   if (typeof window === 'undefined') return null

   const storedSorting = window.localStorage.getItem(
      PRODUCTS_SORTING_STORAGE_KEY,
   )

   if (!storedSorting) return null

   try {
      const parsedSorting = JSON.parse(storedSorting) as {
         sortBy?: string
         order?: string
      }
      const { sortBy, order } = parsedSorting

      if (!isSortField(sortBy ?? null) || !isSortOrder(order ?? null)) {
         return null
      }

      const validSortBy = sortBy as ProductsSorting['sortBy']
      const validOrder = order as ProductsSorting['order']

      return {
         sortBy: validSortBy,
         order: validOrder,
      }
   } catch {
      return null
   }
}

const getNextSorting = (
   current: ProductsSorting | null,
   column: ProductsTableColumn,
): ProductsSorting => {
   const isSameColumn = current?.sortBy === column.sortBy
   return {
      sortBy: column.sortBy,
      order: isSameColumn && current.order === 'asc' ? 'desc' : 'asc',
   }
}

export const useProductsSorting = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const searchParamsSorting = parseSorting(searchParams)
   const storedSorting = parseStoredSorting()
   const sorting = searchParamsSorting ?? storedSorting

   const debouncedSorting = useDebouncedValue(sorting, SORT_DEBOUNCE_DELAY)

   useEffect(() => {
      if (!storedSorting || searchParamsSorting) return

      setSearchParams(
         (prev) => {
            const next = new URLSearchParams(prev)
            next.set('sortBy', storedSorting.sortBy)
            next.set('order', storedSorting.order)
            return next
         },
         { replace: true },
      )
   }, [searchParamsSorting, setSearchParams, storedSorting])

   useEffect(() => {
      if (typeof window === 'undefined' || !sorting) return

      window.localStorage.setItem(
         PRODUCTS_SORTING_STORAGE_KEY,
         JSON.stringify(sorting),
      )
   }, [sorting])

   const handleSortToggle = useCallback(
      (column: ProductsTableColumn) => {
         const { sortBy, order } = getNextSorting(sorting, column)

         setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            next.set('sortBy', sortBy)
            next.set('order', order)
            return next
         })
      },
      [sorting, setSearchParams],
   )

   return { sorting, debouncedSorting, handleSortToggle }
}
