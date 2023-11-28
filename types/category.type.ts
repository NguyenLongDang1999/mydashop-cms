// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface ICategoryForm {
    name: string
    slug: string
    parent_id?: number
    image_uri?: string
    status?: number
    popular?: number
    description?: string
    meta_title?: string
    meta_description?: string
}

export interface ICategoryList {
    id: number
    name: string
    image_uri: string
}

export interface ICategory {
    id: number
    name: string
    parent: ICategoryList
    image_uri: string
    status: number
    popular: number
    created_at: string
}

export interface ICategorySearch extends IPagination {
    name?: string
    parent_id?: number
    status?: number
    popular?: number
}

export interface ICategoryTable extends IAggregations {
    data: ICategory[]
}
