// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface IProductCollectionForm {
    id?: string
    title: string
    slug: string
    status?: number
    product_id: string[]
}

export interface IProductCollectionList {
    id: string
    name: string
}

export interface IProductCollection {
    id: string
    title: string
    product: {
        _count: number
    }[]
    status: number
    created_at: string
}

export interface IProductCollectionSearch extends IPagination {
    title?: string
    status?: number
}

export interface IProductCollectionTable extends IAggregations {
    data: IProductCollection[]
}
