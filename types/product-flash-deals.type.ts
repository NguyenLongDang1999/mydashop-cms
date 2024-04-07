// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

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
    product?: any
    product_variants: {
        id: string
        price: number
        special_price: number
        special_price_type?: number
    }[]
    product_id?: string[]
}

export interface IProductFlashDeals {
    id: string
    title: string
    description: string
    product: {
        _count: number
    }[]
    status: number
    created_at: string
}

export interface IProductFlashDealsSearch extends IPagination {
    title?: string
    status?: number
}

export interface IProductFlashDealsTable extends IAggregations {
    data: IProductFlashDeals[]
}
