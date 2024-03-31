// ** Types Imports
import type { ICategoryList } from '~/types/category.type'
import type { IAggregations, IPagination } from '~/types/core.type'

export type IBrandList = ICategoryList
export interface IBrandForm {
    id?: string
    name: string
    slug: string
    product_category_id: string | string[]
    image_uri?: string
    status?: number
    description?: string
    meta_title?: string
    meta_description?: string
}

export interface IBrand {
    id: string
    name: string
    image_uri: string
    status: number
    productCategoryBrand: ICategoryList[]
}

export interface IBrandSearch extends IPagination {
    name?: string
    product_category_id?: string
    status?: number
}

export interface IBrandTable extends IAggregations {
    data: IBrand[]
}
