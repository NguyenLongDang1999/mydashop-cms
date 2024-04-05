// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface IProductFlashDealsForm {
    id?: string
    title: string
    slug: string
    description?: string
    status?: number
    product_id: string[]
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
