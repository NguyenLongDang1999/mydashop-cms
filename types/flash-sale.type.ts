// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface IFlashSaleForm {
    id?: number
    name: string
    product_id: number[]
    start_time: string | Date
    end_time: string | Date
    discount_percentage: number
}

export interface IFlashSaleSearch extends IPagination {
    name?: string
    product_id?: string
}

export interface IFlashSale {
    id: number
    name: string
    start_time: string
    end_time: string
    discount_percentage: number
    discounted_price: number
}

export interface IFlashSaleTable extends IAggregations {
    data: IFlashSale[]
}
