export type ProductsTableColumn = {
   key: 'name' | 'vendor' | 'sku' | 'rating' | 'price'
   label: string
   sortBy: ProductsSortField
}

export type ProductsTableRow = {
   id: number
   thumbnail: string | null
   name: string
   description: string
   category: string
   vendor: string
   sku: string
   rating: string
   price: string
   dimensions: string
   warranty: string
   shipping: string
   availability: string
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
      addModal: {
         title: 'Добавить товар',
         subtitle: 'Заполните основные данные для новой позиции',
         closeLabel: 'Закрыть окно добавления товара',
         inputs: [
            {
               name: 'name',
               label: 'Наименование',
               placeholder: 'Введите наименование',
               type: 'text',
            },
            {
               name: 'category',
               label: 'Категория',
               placeholder: 'Введите категорию',
               type: 'text',
            },
            {
               name: 'vendor',
               label: 'Вендор',
               placeholder: 'Введите вендора',
               type: 'text',
            },
            {
               name: 'sku',
               label: 'Артикул',
               placeholder: 'Введите артикул',
               type: 'text',
            },
            {
               name: 'price',
               label: 'Цена, ₽',
               placeholder: 'Введите цену',
               type: 'text',
            },
         ],
         submitButton: 'Добавить товар',
         cancelButton: 'Отмена',
         successMessage: 'Товар успешно добавлен',
         errors: {
            name: {
               required: 'Введите наименование товара.',
               min: 'Минимум 2 символа.',
            },
            category: {
               required: 'Введите категорию.',
               min: 'Минимум 2 символа.',
            },
            vendor: {
               required: 'Введите вендора.',
               min: 'Минимум 2 символа.',
            },
            sku: {
               required: 'Введите артикул.',
               min: 'Минимум 2 символа.',
            },
            price: {
               required: 'Введите цену.',
               min: 'Цена должна быть больше 0.',
            },
         },
      },
   },
   table: {
      columnTemplate: 'grid-cols-[23.92%_13.1%_17%_13.1%_17%_15.88%]',
      loadingRowsCount: 30,
      errorMessage: 'Не удалось загрузить товары.',
      detailsPopover: {
         title: 'Информация о товаре',
         fields: {
            description: 'Описание',
            dimensions: 'Размеры',
            warranty: 'Гарантия',
            shipping: 'Доставка',
            availability: 'Доступность',
         },
      },
      columns: [
         { key: 'name', label: 'Наименование', sortBy: 'title' },
         { key: 'vendor', label: 'Вендор', sortBy: 'brand' },
         { key: 'sku', label: 'Артикул', sortBy: 'sku' },
         { key: 'rating', label: 'Оценка', sortBy: 'rating' },
         { key: 'price', label: 'Цена, ₽', sortBy: 'price' },
      ] satisfies ProductsTableColumn[],
   },
}
