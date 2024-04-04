// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface IProductCollectionForm {
    id?: string
    title: string
    slug: string
    status?: number
}

export interface IProductCollectionList {
    id: string
    title: string
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
