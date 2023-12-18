// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface IFlashDealsForm {
    id?: number
    campaign_name: string
    product_id: number[]
    start_date: string | Date
    end_date: string | Date
    discount: number
    status: number
    popular: number
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
