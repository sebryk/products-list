import type {
   GetProductsOptions,
   ProductListItem,
   ProductsApiItem,
   ProductsApiResponse,
   ProductsListResponse,
} from '@/api/products/types'
import type { ProductsSortField } from '@/data/products-page'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const PRODUCTS_LIMIT = Number(import.meta.env.VITE_PRODUCTS_LIMIT)

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
const formatDimensions = (dimensions?: ProductsApiItem['dimensions']) => {
   if (!dimensions) {
      return '—'
   }

   const { width, height, depth } = dimensions

   return `${width} × ${height} × ${depth} см`
}

const mapProductToListItem = (product: ProductsApiItem): ProductListItem => {
   const {
      id,
      title,
      description,
      category,
      brand,
      sku,
      rating,
      price,
      thumbnail,
      dimensions,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
   } = product

   return {
      id,
      thumbnail: thumbnail || null,
      name: title,
      description: description?.trim() || '—',
      category: formatCategory(category),
      vendor: brand?.trim() || '—',
      sku: sku?.trim() || '—',
      rating: `${rating.toFixed(1)}/5`,
      price: formatPrice(price),
      dimensions: formatDimensions(dimensions),
      warranty: warrantyInformation?.trim() || '—',
      shipping: shippingInformation?.trim() || '—',
      availability: availabilityStatus?.trim() || '—',
   }
}

export const getProducts = async ({
   signal,
   sorting,
   page,
   search,
   select,
}: GetProductsOptions): Promise<ProductsListResponse> => {
   const trimmedSearch = search.trim()
   const params = new URLSearchParams({
      limit: String(PRODUCTS_LIMIT),
      skip: String((page - 1) * PRODUCTS_LIMIT),
      select,
   })

   if (sorting) {
      params.set('sortBy', sorting.sortBy)
      params.set('order', sorting.order)
   }

   if (trimmedSearch) {
      params.set('q', trimmedSearch)
   }

   const endpoint = trimmedSearch ? '/products/search' : '/products'
   const response = await fetch(
      `${API_BASE_URL}${endpoint}?${params.toString()}`,
      {
         signal,
      },
   )

   if (!response.ok) {
      throw new Error('Не удалось загрузить товары.')
   }

   const data = (await response.json()) as ProductsApiResponse
   const limit =
      Number.isFinite(data.limit) && data.limit > 0 ? data.limit : PRODUCTS_LIMIT
   const total = Number.isFinite(data.total) && data.total > 0 ? data.total : 0
   const totalPages = total === 0 ? 0 : Math.ceil(total / limit)

   return {
      items: data.products.map(mapProductToListItem),
      page,
      limit,
      total,
      totalPages,
      hasNextPage: data.skip + data.products.length < total,
   }
}
