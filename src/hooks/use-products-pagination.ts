import { useSearchParams } from 'react-router'

const DEFAULT_PAGE = 1

const parsePage = (value: string | null) => {
   const parsedPage = Number(value)

   if (!Number.isInteger(parsedPage) || parsedPage < DEFAULT_PAGE) {
      return DEFAULT_PAGE
   }

   return parsedPage
}

export const useProductsPagination = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const page = parsePage(searchParams.get('page'))

   const setPage = (nextPage: number, replace = false) => {
      setSearchParams(
         (prev) => {
            const next = new URLSearchParams(prev)
            next.set('page', String(Math.max(DEFAULT_PAGE, nextPage)))
            return next
         },
         { replace },
      )
   }

   return { page, setPage }
}
