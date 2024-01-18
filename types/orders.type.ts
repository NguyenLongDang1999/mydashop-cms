// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface IOrders {
    id: number
    code: string
    name: string
    email: string
    phone: string
    status: number
    viewed: number
    grand_total: string
    coupon_discount: number
    _count: {
        OrderDetails: number
    }
}

export interface IOrdersSearch extends IPagination {
    code?: string
    status?: number
    viewed?: number
}

export interface IOrdersTable extends IAggregations {
    data: IOrders[]
}
