// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface ICategoryForm {
    id?: string
    name: string
    slug: string
    parent_id?: number
    image_uri?: string
    status?: number
    description?: string
    meta_title?: string
    meta_description?: string
}

export interface ICategoryList {
    id: string
    name: string
    image_uri: string
    product?: {
        id: number
    }[]
}

export interface ICategory {
    id: string
    name: string
    parentCategory: ICategoryList
    product: {
        _count: number
    }[]
    image_uri: string
    status: number
    created_at: string
}

export interface ICategorySearch extends IPagination {
    name?: string
    parent_id?: string
    status?: number
}

export interface ICategoryTable extends IAggregations {
    data: ICategory[]
}
