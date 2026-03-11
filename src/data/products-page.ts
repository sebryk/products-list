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
      columns: [
         'Наименование',
         'Вендор',
         'Артикул',
         'Оценка',
         'Цена, ₽',
      ],
      rows: [
         {
            name: 'USB Флэшкарта 16GB',
            category: 'Аксессуары',
            vendor: 'Samsung',
            sku: 'RCH45Q1A',
            rating: '4.3/5',
            price: '48 652,00',
         },
      ],
   },
}
