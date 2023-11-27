// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface IFlashSaleForm {
    id?: number
    campaign_name: string
    product_id: number[]
    start_date: string | Date
    end_date: string | Date
    discount: number
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
    discount: number
}

export interface IFlashSaleTable extends IAggregations {
    data: IFlashSale[]
}
