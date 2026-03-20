import { productsPageData } from '@/data/products-page'

export const RowSkeleton = () => {
   const {
      table: { columnTemplate },
   } = productsPageData

   return (
      <div className="h-17.75">
         <div className={`
           grid h-full
           ${columnTemplate}
           items-center
         `}>
            <div className="flex items-center gap-4.5">
               <div className="size-5.5 animate-pulse rounded-sm bg-neutral-200" />
               <div className="size-12 animate-pulse rounded-lg bg-neutral-200" />
               <div className="flex w-52.5 min-w-0 flex-col gap-2.5">
                  <div className="h-4 w-40 animate-pulse rounded-sm bg-neutral-200" />
                  <div className="h-3.5 w-24 animate-pulse rounded-sm bg-neutral-200" />
               </div>
            </div>
            <div className="flex items-center justify-center">
               <div className="h-4 w-18 animate-pulse rounded-sm bg-neutral-200" />
            </div>
            <div className="flex items-center justify-center">
               <div className="h-4 w-18 animate-pulse rounded-sm bg-neutral-200" />
            </div>
            <div className="flex items-center justify-center">
               <div className="h-4 w-12 animate-pulse rounded-sm bg-neutral-200" />
            </div>
            <div className="flex items-center justify-center">
               <div className="h-4 w-20 animate-pulse rounded-sm bg-neutral-200" />
            </div>
            <div className="flex items-center justify-center gap-8 pr-10.5">
               <div className="h-6.75 w-13 animate-pulse rounded-[5.75rem] bg-neutral-200" />
               <div className="size-8 animate-pulse rounded-full bg-neutral-200" />
            </div>
         </div>
      </div>
   )
}
