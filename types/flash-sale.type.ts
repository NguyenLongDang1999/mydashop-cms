// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface IFlashSaleForm {
    id?: number
    campaign_name: string
    product_id: number[]
    date_range?: string | string[]
    start_date: string | Date
    end_date: string | Date
    discount_percent: number
}

export interface IFlashSaleSearch extends IPagination {
    campaign_name?: string
    product_id?: string
}

export interface IFlashSale {
    id: number
    campaign_name: string
    start_date: string
    end_date: string
    discount_percent: number
    discounted_price: number
}

export interface IFlashSaleTable extends IAggregations {
    data: IFlashSale[]
}
