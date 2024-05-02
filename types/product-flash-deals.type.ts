// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'
import type { IProductGenerateVariant } from './product.type'

export interface IProductFlashDealsForm {
    id?: string
    title: string
    slug: string
    description?: string
    status?: number
    start_time: Date
    end_time: Date
    date_range?: {
        start: Date
        end: Date
    }
    product?: {
        id: string
    }[]
    product_variants: {
        id: string
        price: number
        special_price: number
        special_price_type?: number
    }[]
    product_id?: string[]
    productVariants?: IProductGenerateVariant[]
}

export interface IProductFlashDeals {
    id: string
    title: string
    start_time: string
    end_time: string
    flashDealProducts: {
        _count: number
    }[]
    status: number
}

export interface IProductFlashDealsSearch extends IPagination {
    title?: string
    status?: number
}

export interface IProductFlashDealsTable extends IAggregations {
    data: IProductFlashDeals[]
}

export interface IProductFlashDealsList {
    id: string
    name: string
}

export interface IHomeProductFlashDealsSearch extends IPagination {
    id?: string
    sku?: string
    name?: string
    product_brand_id?: string
    product_category_id?: string
    status?: string
    product_type?: string
}
