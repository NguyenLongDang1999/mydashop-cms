// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'
import type { IProductBrandList } from '~/types/product-brand.type'
import type { IProductCategoryList } from '~/types/product-category.type'
import type { IProductAttributeValuesList } from './product-attribute.type'

export interface IProductList {
    id: string
    name: string
    image_uri: string
}

export interface IProductFormInit {
    id?: string
    sku?: string
    name: string
    slug: string
    image_uri?: string
    product_type?: number
    product_upsell?: string[]
    product_cross_sell?: string[]
    product_related?: string[]
}

export interface IProductFormSingle extends IProductFormInit {
    image_uri?: string
    product_category_id?: string
    product_brand_id?: string
    technical_specifications?: string | IProductSpecification[]
    short_description?: string
    description?: string
    status?: number
    meta_title?: string
    meta_description?: string
    price?: number
    special_price?: number
    special_price_type?: number
    quantity?: number
    manage_stock?: string
}

export interface IProductFormVariant extends IProductFormInit {
    image_uri?: string
    product_category_id?: string
    product_brand_id?: string
    product_attribute_id?: string[]
    technical_specifications?: string | IProductSpecification[]
    short_description?: string
    description?: string
    status?: number
    meta_title?: string
    meta_description?: string
    special_price_type?: number
    product_attributes?: string | IProductAttributeValuesList[]
    product_variants?: string | IProductVariant[]
    product_images?: string | IProductUpload[]
}


export interface IProductFormSales extends IProductFormInit {
    product_relations: string | {
        related_product_id: string
        relation_type: number
    }[]
}

export interface IProductFormImages extends IProductFormInit {
    product_images: IProductUpload[] | string
}

export interface IProductSpecification {
    id: string
    title: string
    content: string
}

export interface IProductSearch extends IPagination {
    id?: string
    sku?: string
    name?: string
    product_brand_id?: string
    product_category_id?: string
    status?: string
}

export interface IProduct {
    id: string
    sku: string
    name: string
    price: string
    special_price: string
    special_price_type: number
    quantity: number
    status: number
    image_uri: string
    created_at: string
    productBrand: IProductBrandList
    productCategory: IProductCategoryList
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
    special_price_type: string
    quantity: number
    manage_stock: string
    product_attribute_value_id: string[]
}

export interface IProductGenerateVariant {
    id: string
    name: string
    image_uri: string
    productVariants: {
        id: string
        sku: string
        label: string
        price: number
        special_price: number
        special_price_type?: number
    }[]
}
