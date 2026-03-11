import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'

import { productsSortFields } from '@/api/products'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import type {
   ProductsSortOrder,
   ProductsSorting,
   ProductsTableColumn,
} from '@/data/products-page'

const SORT_DEBOUNCE_DELAY = 50
const PRODUCTS_SORTING_STORAGE_KEY = 'aiti-guru.products-sorting'

const isSortOrder = (value: string | null): value is ProductsSortOrder =>
   value === 'asc' || value === 'desc'

const isSortField = (
   value: string | null,
): value is (typeof productsSortFields)[number] =>
   value !== null &&
   productsSortFields.includes(value as (typeof productsSortFields)[number])

const parseStoredSorting = (): ProductsSorting | null => {
   if (typeof window === 'undefined') return null

   const raw = window.localStorage.getItem(PRODUCTS_SORTING_STORAGE_KEY)
   if (!raw) return null

   try {
      const { sortBy, order } = JSON.parse(raw) as {
         sortBy?: string
         order?: string
      }

      if (!isSortField(sortBy ?? null) || !isSortOrder(order ?? null))
         return null

      return {
         sortBy: sortBy as ProductsSorting['sortBy'],
         order: order as ProductsSorting['order'],
      }
   } catch {
      return null
   }
}

const getNextSorting = (
   current: ProductsSorting | null,
   column: ProductsTableColumn,
): ProductsSorting => ({
   sortBy: column.sortBy,
   order:
      current?.sortBy === column.sortBy && current.order === 'asc'
         ? 'desc'
         : 'asc',
})

export const useProductsSorting = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const [storedSorting] = useState(() => parseStoredSorting())

   const sortBy = searchParams.get('sortBy')
   const order = searchParams.get('order')

   const searchParamsSorting =
      isSortField(sortBy) && isSortOrder(order) ? { sortBy, order } : null

   const sorting = useMemo(
      () => searchParamsSorting ?? storedSorting,
      [sortBy, order, storedSorting],
   )

   const debouncedSorting = useDebouncedValue(sorting, SORT_DEBOUNCE_DELAY)

   useEffect(() => {
      if (!storedSorting || (isSortField(sortBy) && isSortOrder(order))) return

      setSearchParams(
         (prev) => {
            const next = new URLSearchParams(prev)
            next.set('sortBy', storedSorting.sortBy)
            next.set('order', storedSorting.order)
            return next
         },
         { replace: true },
      )
   }, [sortBy, order, setSearchParams, storedSorting])

   useEffect(() => {
      if (!sorting) return

      window.localStorage.setItem(
         PRODUCTS_SORTING_STORAGE_KEY,
         JSON.stringify(sorting),
      )
   }, [sorting])

   const handleSortToggle = (column: ProductsTableColumn) => {
      const { sortBy, order } = getNextSorting(sorting, column)

      setSearchParams((prev) => {
         const next = new URLSearchParams(prev)
         next.set('sortBy', sortBy)
         next.set('order', order)
         return next
      })
   }

   return { sorting, debouncedSorting, handleSortToggle }
}
