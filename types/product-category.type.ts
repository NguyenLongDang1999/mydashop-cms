// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface IProductCategoryForm {
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

export interface IProductCategoryList {
    id: string
    name: string
    image_uri: string
    product?: {
        id: number
    }[]
}

export interface IProductCategory {
    id: string
    name: string
    parentCategory: IProductCategoryList
    product: {
        _count: number
    }[]
    image_uri: string
    status: number
    created_at: string
}

export interface IProductCategorySearch extends IPagination {
    name?: string
    parent_id?: string
    status?: number
}

export interface IProductCategoryTable extends IAggregations {
    data: IProductCategory[]
}
