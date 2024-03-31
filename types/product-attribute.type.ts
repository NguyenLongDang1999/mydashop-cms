// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'
import type { IProductCategory } from '~/types/product-category.type'

// ** ATTRIBUTE
export type IProductAttributeList = IProductCategory
export interface IProductAttributeForm {
    id?: string
    name: string
    slug: string
    product_category_id: string | string[]
    status?: number
    description?: string
}

export interface IProductAttribute {
    id: string
    name: string
    status: number
    created_at: string
    productAttributeValues: {
        _count: number
    }[]
    productCategoryAttributes: IProductCategory[]
}

export interface IProductAttributeSearch extends IPagination {
    name?: string
    product_category_id?: number
    status?: number
}

export interface IProductAttributeTable extends IAggregations {
    data: IProductAttribute[]
}

// ** ATTRIBUTE VALUES
export interface IProductAttributeValue {
    id: string
    value: string
    productAttribute: {
        id: string
        name: string
    }
}

export interface IProductAttributeValuesSearch extends IPagination {
    value?: string
    product_attribute_id?: string
}

export interface IProductAttributeValuesTable extends IAggregations {
    data: IProductAttributeValue[]
}

export interface IProductAttributeValuesDataList {
    id: string
    name: string
}

export interface IProductAttributeValuesForm {
    id?: string
    value: string
    product_attribute_id: string
}

export interface IProductAttributeValuesList {
    id: string
    name: string
    values: string[]
}
