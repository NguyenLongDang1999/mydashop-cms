// ** Types Imports
import type { IAttributeValuesList } from '~/types/attribute.type'
import type { IBrandList } from '~/types/brand.type'
import type { ICategoryList } from '~/types/category.type'
import type { IAggregations, IPagination } from '~/types/core.type'

export interface IProductList {
    id: number
    name: string
    image_uri: string
}

export interface IProductForm {
    id?: number
    sku: string
    name: string
    slug: string
    image_uri?: string
    category_id?: number
    attributes?: string | IAttributeValuesList[]
    variants?: string | IProductVariant[]
    technical_specifications?: string | IProductSpecification[]
    short_description?: string
    description?: string
    brand_id?: string
    status?: number
    popular?: number
    meta_title?: string
    meta_description?: string
    related_products?: string | number[]
    upsell_products?: string | number[]
    cross_sell_products?: string | number[]
    productImage: IProductUpload[]
}

export interface IProductSpecification {
    id: number
    title: string
    content: string
}

export interface IProductSearch extends IPagination {
    id?: number
    sku?: string
    name?: string
    brand_id?: number
    category_id?: number
    status?: string
    popular?: string
}

export interface IProduct {
    id: number
    sku: string
    name: string
    discount: number
    price: string
    special_price: string
    special_price_type: number
    selling_price: string
    quantity: number
    status: number
    popular: number
    image_uri: string
    created_at: string
    brand: IBrandList
    category: ICategoryList
}
export interface IProductTable extends IAggregations {
    data: IProduct[]
}

export interface IProductUpload {
    id?: number
    image_id?: number
    index: number
    slug: string
    image_uri: File | string
}

export interface IProductVariant {
    label: string
    is_default: boolean
    sku: string
    price: number
    special_price: number
    special_price_type: number
    selling_price: number
    quantity: number
    in_stock: number
}
