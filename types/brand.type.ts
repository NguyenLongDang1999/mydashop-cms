// ** Types Imports
import type { ICategoryList } from '~/types/category.type'
import type { IAggregations, IPagination } from '~/types/core.type'

export type IBrandList = ICategoryList
export interface IBrandForm {
    name: string
    slug: string
    category_id: number[] | string
    image_uri?: string
    status?: number
    popular?: number
    description?: string
    meta_title?: string
    meta_description?: string
}

export interface IBrand {
    id: number
    name: string
    image_uri: string
    status: number
    popular: number
    categories: ICategoryList[]
}

export interface IBrandSearch extends IPagination {
    name?: string
    category_id?: number
    status?: number
    popular?: number
}

export interface IBrandTable extends IAggregations {
    data: IBrand[]
}
