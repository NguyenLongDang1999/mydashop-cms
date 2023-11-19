// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface ICouponsForm {
    name: string
    code: string
    discount: number
    discount_type: number
    expire_date: string
    status?: number
}

export interface ICoupons {
    id: number
    name: string
    code: string
    status: number
}

export interface ICouponsSearch extends IPagination {
    name?: string
    code?: number
}

export interface ICouponsTable extends IAggregations {
    data: ICoupons[]
}
