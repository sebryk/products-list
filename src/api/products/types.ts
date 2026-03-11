import type { ProductsSorting } from '@/data/products-page'

export type ProductsApiItem = {
   id: number
   title: string
   category: string
   brand?: string
   sku?: string
   rating: number
   price: number
   thumbnail?: string
}

export type ProductsApiResponse = {
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

export type GetProductsOptions = {
   signal?: AbortSignal
   sorting: ProductsSorting | null
   select: string
}
