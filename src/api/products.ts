import type {
   ProductsSortField,
   ProductsSorting,
} from '@/data/products-page'

const API_BASE_URL = 'https://dummyjson.com'
const PRODUCTS_LIMIT = 30

type ProductsApiItem = {
   id: number
   title: string
   category: string
   brand?: string
   sku?: string
   rating: number
   price: number
   thumbnail?: string
}

type ProductsApiResponse = {
   products: ProductsApiItem[]
}

export type ProductListItem = {
   id: number
   thumbnail: string | null
   name: string
   category: string
   vendor: string
   sku: string
   rating: string
   price: string
}

export const productsQueryKey = ['products'] as const
export const productsSortFields = [
   'title',
   'brand',
   'sku',
   'rating',
   'price',
] as const satisfies ProductsSortField[]

const formatPrice = (price: number) =>
   new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   }).format(price)

const formatCategory = (category: string) => category.replaceAll('-', ' ')

const mapProductToListItem = (product: ProductsApiItem): ProductListItem => {
   const {
      id,
      title,
      category,
      brand,
      sku,
      rating,
      price,
      thumbnail,
   } = product

   return {
      id,
      thumbnail: thumbnail || null,
      name: title,
      category: formatCategory(category),
      vendor: brand?.trim() || '—',
      sku: sku?.trim() || '—',
      rating: `${rating.toFixed(1)}/5`,
      price: formatPrice(price),
   }
}

type GetProductsOptions = {
   signal?: AbortSignal
   sorting: ProductsSorting | null
}

export const getProducts = async ({
   signal,
   sorting,
}: GetProductsOptions): Promise<ProductListItem[]> => {
   const params = new URLSearchParams({
      limit: String(PRODUCTS_LIMIT),
      select: 'id,title,category,brand,sku,rating,price,thumbnail',
   })

   if (sorting) {
      params.set('sortBy', sorting.sortBy)
      params.set('order', sorting.order)
   }

   const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`, {
      signal,
   })

   if (!response.ok) {
      throw new Error('Не удалось загрузить товары.')
   }

   const data = (await response.json()) as ProductsApiResponse

   return data.products.map(mapProductToListItem)
}
