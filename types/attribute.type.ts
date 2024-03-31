// ** Types Imports
import type { ICategoryList } from '~/types/category.type'
import type { IAggregations, IPagination } from '~/types/core.type'

export type IAttributeList = ICategoryList
export interface IAttributeForm {
    id?: string
    name: string
    slug: string
    product_category_id: string | string[]
    status?: number
    description?: string
}

export interface IAttributeValues {
    id?: string
    product_attribute_id: string
    value: string
}

export interface IAttributeValuesList {
    id: string
    name: string
    values: string[] | number[]
}

export interface IAttribute {
    id: string
    name: string
    status: number
    created_at: string
    productCategoryAttributes: ICategoryList[]
}

export interface IAttributeSearch extends IPagination {
    name?: string
    product_category_id?: number
    status?: number
}

export interface IAttributeTable extends IAggregations {
    data: IAttribute[]
}

export interface IAttributeValue {
    id: string
    value: string
    attribute: {
        id: string
        name: string
    }
}

export interface IAttributeValuesSearch extends IPagination {
    value?: string
    attribute_id?: string
}

export interface IAttributeValuesTable extends IAggregations {
    data: IAttributeValue[]
}

export interface IAttributeValuesDataList {
    id: string
    name: string
}

export interface IAttributeValuesForm {
    id?: string
    value: string
    product_attribute_id: string
}
