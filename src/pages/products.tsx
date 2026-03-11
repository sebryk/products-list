import ArrowsClockwiseIcon from '@/assets/products-page/icons/arrows-clockwise.svg?react'
import PlusCircleIcon from '@/assets/products-page/icons/plus-circle.svg?react'
import SearchIcon from '@/assets/products-page/icons/search.svg?react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const detailColumns = ['Вендор', 'Артикул', 'Оценка', 'Цена, ₽']

export function ProductsPage() {
   return (
      <main className="min-h-screen bg-neutral-100 pt-5 text-neutral-900">
         <div className="bg-neutral-0 rounded-2.5 grid h-26.25 grid-cols-[1fr_auto_1fr] items-center px-7.5">
            <h1 className="font-cairo text-2xl leading-none font-bold text-neutral-900">
               Товары
            </h1>
            <div className="col-start-2 flex items-center justify-center">
               <Input
                  variant="search"
                  startIcon={SearchIcon}
                  placeholder="Найти"
                  aria-label="Поиск товаров"
                  className="w-255.75"
               />
            </div>
         </div>
         <div className="bg-neutral-0 mt-7.5 flex items-center justify-between px-7.5 pt-[30px] pb-[40px]">
            <h2 className="font-cairo text-xl leading-5 font-bold text-[#333333]">
               Все позиции
            </h2>
            <div className="flex items-center gap-2">
               <Button
                  variant="productsIcon"
                  aria-label="Обновить список товаров"
               >
                  <ArrowsClockwiseIcon className="size-5.5" />
               </Button>
               <Button variant="productsAction">
                  <PlusCircleIcon className="size-5.5" />
                  <span className="ml-3.75">Добавить</span>
               </Button>
            </div>
         </div>
         <div className="bg-neutral-0 px-7.5">
            <div className="rounded-2.5 px-[18px] py-6">
               <div className="flex items-center gap-[79px]">
                  <div className="flex w-[278px] items-center gap-5 py-px">
                     <span
                        aria-hidden="true"
                        className="size-[22px] rounded border border-[#b2b3b9]"
                     />
                     <span className="font-cairo text-base leading-none font-bold text-[#b2b3b9]">
                        Наименование
                     </span>
                  </div>
                  <div className="flex w-[1218px] items-center justify-center gap-[150px]">
                     {detailColumns.map((column) => (
                        <span
                           key={column}
                           className="font-cairo w-[125px] text-center text-base leading-none font-bold text-[#b2b3b9]"
                        >
                           {column}
                        </span>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </main>
   )
}
