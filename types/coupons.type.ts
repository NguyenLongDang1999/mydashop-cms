// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface ICouponsForm {
    code: string
    min_buy: number
    discount_type: number
    discount_amount: number
    discount_start_date: string
    discount_end_date: string
}

export interface ICoupons extends ICouponsForm {
    id?: number
}

export interface ICouponsSearch extends IPagination {
    code?: number
}

export interface ICouponsTable extends IAggregations {
    data: ICoupons[]
}
