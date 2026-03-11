import type { ProductsSorting } from '@/data/products-page'

export type ProductsApiDimensions = {
   width: number
   height: number
   depth: number
}

export type ProductsApiItem = {
   id: number
   title: string
   description?: string
   category: string
   brand?: string
   sku?: string
   rating: number
   price: number
   thumbnail?: string
   dimensions?: ProductsApiDimensions
   warrantyInformation?: string
   shippingInformation?: string
   availabilityStatus?: string
}

export type ProductsApiResponse = {
   products: ProductsApiItem[]
   total: number
   skip: number
   limit: number
}

export type ProductListItem = {
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

export type ProductsListResponse = {
   items: ProductListItem[]
   page: number
   limit: number
   total: number
   totalPages: number
   hasNextPage: boolean
}

export type GetProductsOptions = {
   signal?: AbortSignal
   sorting: ProductsSorting | null
   page: number
   select: string
}
