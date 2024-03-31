// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'
import type { IProductCategoryList } from '~/types/product-category.type'

export type IProductBrandList = IProductCategoryList
export interface IProductBrandForm {
    id?: string
    name: string
    slug: string
    product_category_id: string | string[]
    image_uri?: string
    status?: number
    description?: string
}

export interface IProductBrand {
    id: string
    name: string
    image_uri: string
    status: number
    productCategoryBrand: IProductCategoryList[]
}

export interface IProductBrandSearch extends IPagination {
    name?: string
    product_category_id?: string
    status?: number
}

export interface IProductBrandTable extends IAggregations {
    data: IProductBrand[]
}
