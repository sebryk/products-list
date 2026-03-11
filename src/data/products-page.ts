export type ProductsTableColumn = {
   key: 'name' | 'vendor' | 'sku' | 'rating' | 'price'
   label: string
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
         { key: 'name', label: 'Наименование' },
         { key: 'vendor', label: 'Вендор' },
         { key: 'sku', label: 'Артикул' },
         { key: 'rating', label: 'Оценка' },
         { key: 'price', label: 'Цена, ₽' },
      ] satisfies ProductsTableColumn[],
   },
}
