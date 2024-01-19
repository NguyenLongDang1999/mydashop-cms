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

export interface IProductFormInit {
    id?: number
    sku: string
    name: string
    slug: string
    product_type: number
}

export interface IProductForm extends IProductFormInit {
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
    productImage: IProductUpload[] | string

    special_price_type?: number
    quantity?: number
    in_stock?: number
    attribute_id?: number[]
    FlashDealsProduct: string[]
}

export interface IProductFormInformations extends IProductFormInit {
    status?: number
    popular?: number
    technical_specifications?: string | IProductSpecification[]
    short_description?: string
    description?: string
    quantity?: number
    in_stock?: number
    special_price_type?: number
    price?: number
    special_price?: number
    selling_price?: number
    meta_title?: string
    meta_description?: string
}

export interface IProductFormAttributes extends IProductFormInit {
    category_id: number
    brand_id?: string
    attribute_id?: number[]
    attributes?: string | IAttributeValuesList[]
    variants?: string | IProductVariant[]
}

export interface IProductFormSales extends IProductFormInit {
    related_products?: string | number[]
    upsell_products?: string | number[]
    cross_sell_products?: string | number[]
}

export interface IProductFormImages extends IProductFormInit {
    productImage: IProductUpload[] | string
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
    price: string
    special_price: string
    special_price_type: number
    discount_start_date: string
    discount_end_date: string
    discount_type: number
    discount_amount: string
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
    image_uri: string
}

export interface IProductVariant {
    label: string
    is_default: boolean
    sku: string
    price: number
    special_price: number
    special_price_type: number
    quantity: number
    in_stock: number
}
