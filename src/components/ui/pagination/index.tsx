import type { ComponentProps } from 'react'

import ChevronIcon from '@/assets/products-page/icons/chevron.svg?react'
import { Button } from '@/components/ui/button'
import { productsPageData } from '@/data/products-page'
import { cn } from '@/lib/utils'

type PaginationProps = ComponentProps<'nav'> & {
   page: number
   totalPages: number
   hasNextPage: boolean
   onPageChange: (page: number) => void
}

type PaginationLinkProps = {
   isActive?: boolean
   isDisabled?: boolean
   page: number
   onPageChange: (page: number) => void
}

const MAX_VISIBLE_PAGES = 5
const normalizeTotalPages = (totalPages: number) =>
   Number.isFinite(totalPages) && totalPages > 0 ? Math.floor(totalPages) : 0

const getVisiblePages = (page: number, totalPages: number) => {
   if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
   }

   const maxStartPage = totalPages - MAX_VISIBLE_PAGES + 1
   const startPage = Math.min(
      Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2)),
      maxStartPage,
   )

   return Array.from(
      { length: MAX_VISIBLE_PAGES },
      (_, index) => startPage + index,
   )
}

export const PaginationContent = ({
   className,
   ...props
}: ComponentProps<'ul'>) => (
   <ul className={cn('flex items-center gap-2', className)} {...props} />
)

export const PaginationItem = (props: ComponentProps<'li'>) => <li {...props} />

export const PaginationLink = ({
   isActive = false,
   isDisabled = false,
   page,
   onPageChange,
}: PaginationLinkProps) => {
   return (
      <Button
         variant="pagination"
         disabled={isDisabled}
         className={cn(
            isActive &&
               'border-primary-600 bg-primary-600 text-neutral-0 hover:border-primary-600 hover:bg-primary-600 hover:text-neutral-0',
         )}
         onClick={() => onPageChange(page)}
      >
         {page}
      </Button>
   )
}

export const PaginationPrevious = ({
   disabled,
   onClick,
}: {
   disabled: boolean
   onClick: () => void
}) => {
   const {
      table: { pagination },
   } = productsPageData

   return (
      <Button
         variant="pagination"
         disabled={disabled}
         aria-label={pagination.previousLabel}
         className="flex-center mr-2 flex size-5 border-transparent shadow-none hover:border-transparent"
         onClick={onClick}
      >
         <ChevronIcon className="size-5 rotate-180" />
      </Button>
   )
}

export const PaginationNext = ({
   disabled,
   onClick,
}: {
   disabled: boolean
   onClick: () => void
}) => {
   const {
      table: { pagination },
   } = productsPageData

   return (
      <Button
         variant="pagination"
         disabled={disabled}
         aria-label={pagination.nextLabel}
         className="flex-center ml-2 flex size-5 border-transparent shadow-none hover:border-transparent"
         onClick={onClick}
      >
         <ChevronIcon className="size-5" />
      </Button>
   )
}

export const Pagination = ({
   page,
   totalPages,
   hasNextPage,
   onPageChange,
   className,
   ...props
}: PaginationProps) => {
   const normalizedTotalPages = normalizeTotalPages(totalPages)
   const lastAvailablePage = hasNextPage
      ? normalizedTotalPages
      : Math.min(normalizedTotalPages, page)

   if (lastAvailablePage <= 1) {
      return null
   }

   const visiblePages = getVisiblePages(page, lastAvailablePage)
   const isPreviousDisabled = page <= 1
   const isNextDisabled = page >= lastAvailablePage || !hasNextPage

   return (
      <nav className={cn('flex justify-end', className)} {...props}>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  disabled={isPreviousDisabled}
                  onClick={() => onPageChange(page - 1)}
               />
            </PaginationItem>
            {visiblePages.map((visiblePage) => (
               <PaginationItem key={visiblePage}>
                  <PaginationLink
                     page={visiblePage}
                     isActive={visiblePage === page}
                     onPageChange={onPageChange}
                  />
               </PaginationItem>
            ))}
            <PaginationItem>
               <PaginationNext
                  disabled={isNextDisabled}
                  onClick={() => onPageChange(page + 1)}
               />
            </PaginationItem>
         </PaginationContent>
      </nav>
   )
}
