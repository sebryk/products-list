export type ProductsTableColumn = {
   key: 'name' | 'vendor' | 'sku' | 'rating' | 'price'
   label: string
   sortBy: ProductsSortField
}

export type ProductsTableRow = {
   id: number
   thumbnail: string | null
   name: string
   category: string
   vendor: string
   sku: string
   rating: string
   price: string
}

export type ProductsSortField =
   | 'title'
   | 'brand'
   | 'sku'
   | 'rating'
   | 'price'

export type ProductsSortOrder = 'asc' | 'desc'

export type ProductsSorting = {
   sortBy: ProductsSortField
   order: ProductsSortOrder
}

export const productsPageData = {
   search: {
      title: 'Товары',
      placeholder: 'Найти',
      ariaLabel: 'Поиск товаров',
   },
   controls: {
      title: 'Все позиции',
      refreshLabel: 'Обновить список товаров',
      addButton: 'Добавить',
   },
   table: {
      columnTemplate: 'grid-cols-[23.92%_13.1%_17%_13.1%_17%_15.88%]',
      loadingRowsCount: 30,
      errorMessage: 'Не удалось загрузить товары.',
      columns: [
         { key: 'name', label: 'Наименование', sortBy: 'title' },
         { key: 'vendor', label: 'Вендор', sortBy: 'brand' },
         { key: 'sku', label: 'Артикул', sortBy: 'sku' },
         { key: 'rating', label: 'Оценка', sortBy: 'rating' },
         { key: 'price', label: 'Цена, ₽', sortBy: 'price' },
      ] satisfies ProductsTableColumn[],
   },
}
