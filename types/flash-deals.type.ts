// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'
import type { IProduct } from '~/types/product.type'

export interface IFlashDealsForm {
    id?: number
    campaign_name: string
    product_id: number[] | IProduct[]
    start_date: string | Date
    end_date: string | Date
    discount: number
    status: number
    popular: number
    date_range?: {
        start: string
        end: string
    }
}

export interface IFlashDealsSearch extends IPagination {
    campaign_name?: string
    product_id?: string
}

export interface IFlashDeals {
    id: number
    campaign_name: string
    start_date: string
    end_date: string
    discount: number
    status: number
    popular: number
}

export interface IFlashDealsTable extends IAggregations {
    data: IFlashDeals[]
}
