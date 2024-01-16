// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface IPagesForm {
    id?: number
    name: string
    slug: string
    status?: number
    content: string
    meta_title?: string
    meta_description?: string
}

export interface IPages {
    id: number
    name: string
    status: number
    created_at: string
}

export interface IPagesSearch extends IPagination {
    name?: string
    status?: number
}

export interface IPagesTable extends IAggregations {
    data: IPages[]
}
