// ** Types Imports
import type { ICategoryList } from '~/types/category.type'
import type { IAggregations, IPagination } from '~/types/core.type'

export type IAttributeList = ICategoryList
export interface IAttributeForm {
    name: string
    slug: string
    category_id: string | number[]
    attribute_value_id: string | IAttributeValues[]
    status?: number
    description?: string
}

export interface IAttributeValues {
    id?: number
    attribute_id?: number
    value: string
}

export interface IAttributeValuesList {
    id: number
    name: string
    values: string[] | number[]
}

export interface IAttribute {
    id: number
    name: string
    status: number
    created_at: string
    updated_at: string
    categories: ICategoryList[]
}

export interface IAttributeSearch extends IPagination {
    name?: string
    category_id?: number
    status?: number
}

export interface IAttributeTable extends IAggregations {
    data: IAttribute[]
}
