export type ProductsTableColumn = {
   key: 'name' | 'vendor' | 'sku' | 'rating' | 'price'
   label: string
}

export type ProductsTableRow = {
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
      columns: [
         { key: 'name', label: 'Наименование' },
         { key: 'vendor', label: 'Вендор' },
         { key: 'sku', label: 'Артикул' },
         { key: 'rating', label: 'Оценка' },
         { key: 'price', label: 'Цена, ₽' },
      ] satisfies ProductsTableColumn[],
      rows: [
         {
            name: 'USB Флэшкарта 16GB',
            category: 'Аксессуары',
            vendor: 'Samsung',
            sku: 'RCH45Q1A',
            rating: '4.3/5',
            price: '48 652,00',
         },
      ] satisfies ProductsTableRow[],
   },
}
