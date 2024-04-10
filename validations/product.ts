// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

// ** Types Imports
import type { IProductUpload } from '~/types/product.type'

export const label = {
    sku: 'Mã sản phẩm',
    name: 'Tên sản phẩm',
    slug: 'Đường dẫn URL',
    product_category_id: 'Danh mục',
    product_type: 'Loại sản phẩm',
    product_brand_id: 'Thương hiệu',
    status: 'Trạng thái',
    quantity: 'Số lượng',
    manage_stock: 'Quản lý hàng tồn kho?',
    price: 'Giá tiền',
    special_price: 'Giá ưu đãi',
    special_price_type: 'Loại ưu đãi',
    selling_price: 'Giá bán',
    technical_specifications: {
        name: 'Thông số kỹ thuật',
        title: 'Tiêu đề',
        content: 'Nội dung'
    },
    attribute: {
        name: 'Thuộc tính',
        values: 'Giá trị'
    },
    short_description: 'Mô tả ngắn',
    description: 'Mô tả chi tiết',
    meta_title: 'Meta Title',
    meta_description: 'Meta Description',
    related_products: 'Sản phẩm liên quan',
    upsell_products: 'Sản phẩm UpSell',
    cross_sell_products: 'Sản phẩm CrossSell'
}

export const schema = toTypedSchema(yup.object({
    sku: yup
        .string()
        .required(`${label.sku} không được bỏ trống.`)
        .max(30, ({ max }) => `${label.sku} không được vượt quá ${max} ký tự.`),
    name: yup
        .string()
        .required(`${label.name} không được bỏ trống.`)
        .max(60, ({ max }) => `${label.name} không được vượt quá ${max} ký tự.`),
    slug: yup
        .string()
        .required(`${label.slug} không được bỏ trống.`),
    product_category_id: yup
        .string()
        .required(`${label.product_category_id} không được bỏ trống.`),
    short_description: yup.string().notRequired(),
    description: yup
        .string()
        .required(`${label.description} không được bỏ trống.`),
    technical_specifications: yup.array()
        .of(
            yup.object().shape({
                title: yup.string().required(`${label.technical_specifications.title} không được bỏ trống.`),
                content: yup.string().required(`${label.technical_specifications.content} không được bỏ trống.`)
            }).default({ title: '', content: '' })
        ),
    price: yup
        .number()
        .required(`${label.price} không được bỏ trống.`)
        .default(0)
        .min(0, ({ min }) => `${label.price} phải lớn hơn hoặc bằng ${min}.`),
    quantity: yup
        .number()
        .required(`${label.quantity} không được bỏ trống.`)
        .default(0)
        .min(0, ({ min }) => `${label.quantity} phải lớn hơn hoặc bằng ${min}.`),
    special_price_type: yup
        .string()
        .required(`${label.special_price_type} không được bỏ trống.`)
        .default(SPECIAL_PRICE.PRICE),
    special_price: yup.number()
        .required(`${label.special_price} không được bỏ trống.`)
        .default(0)
        .min(0, `${label.special_price} phải lớn hơn hoặc bằng 0.`)
        .when('special_price_type', (special_price_type, schemaContext) => special_price_type.toString() === SPECIAL_PRICE.PERCENT
            ? schemaContext.max(100, `${label.special_price} phải nhỏ hơn hoặc bằng 100.`)
            : schemaContext),
    productImage: yup.mixed<string | IProductUpload[]>().notRequired(),
    related_products: yup.array(yup.number().required()),
    upsell_products: yup.array(yup.number().required()),
    cross_sell_products: yup.array(yup.number().required())
}))

export const schemaVariants = toTypedSchema(yup.object({
    name: yup
        .string()
        .required(`${label.name} không được bỏ trống.`)
        .max(60, ({ max }) => `${label.name} không được vượt quá ${max} ký tự.`),
    slug: yup
        .string()
        .required(`${label.slug} không được bỏ trống.`),
    short_description: yup.string().notRequired(),
    description: yup
        .string()
        .required(`${label.description} không được bỏ trống.`),
    technical_specifications: yup.array()
        .of(
            yup.object().shape({
                title: yup.string().required(`${label.technical_specifications.title} không được bỏ trống.`),
                content: yup.string().required(`${label.technical_specifications.content} không được bỏ trống.`)
            }).default({ title: '', content: '' })
        ),
    product_category_id: yup
        .string()
        .required(`${label.product_category_id} không được bỏ trống.`),
    product_attribute_id: yup
        .array()
        .of(yup.string())
        .min(1, `${label.attribute.name} không được bỏ trống.`)
        .default([]),
    product_attributes: yup.array().of(
        yup.object({
            name: yup.string().required(`${label.attribute.name} không được bỏ trống.`),
            values: yup.array()
                .of(yup.string())
                .min(1, `${label.attribute.values} không được bỏ trống.`)
                .required(`${label.attribute.values} không được bỏ trống.`)
        })
    ),
    product_variants: yup.array()
        .of(
            yup.object().shape({
                is_default: yup.boolean(),
                label: yup.string(),
                sku: yup.string().required(`${label.sku} không được bỏ trống.`),
                price: yup
                    .number()
                    .required(`${label.price} không được bỏ trống.`)
                    .min(0, ({ min }) => `${label.price} phải lớn hơn hoặc bằng ${min}.`),
                quantity: yup
                    .number()
                    .required(`${label.quantity} không được bỏ trống.`)
                    .min(0, ({ min }) => `${label.quantity} phải lớn hơn hoặc bằng ${min}.`),
                special_price_type: yup
                    .string()
                    .required(`${label.special_price_type} không được bỏ trống.`)
                    .default(SPECIAL_PRICE.PRICE),
                special_price: yup.number()
                    .required(`${label.special_price} không được bỏ trống.`)
                    .default(0)
                    .min(0, `${label.special_price} phải lớn hơn hoặc bằng 0.`)
                    .when('special_price_type', (special_price_type, schemaContext) => special_price_type.toString() === SPECIAL_PRICE.PERCENT
                        ? schemaContext.max(100, `${label.special_price} phải nhỏ hơn hoặc bằng 100.`)
                        : schemaContext)

            })
        ).test('is-default-check', 'Phải có ít nhất một sản phẩm được đặt làm mặc định.', (variants = []) => variants.some(variant => variant.is_default)),
    productImage: yup.mixed<string | IProductUpload[]>().notRequired(),
    related_products: yup.array(yup.number().required()),
    upsell_products: yup.array(yup.number().required()),
    cross_sell_products: yup.array(yup.number().required())
}))

export const schemaVariantsGeneral = toTypedSchema(yup.object({
    name: yup
        .string()
        .required(`${label.name} không được bỏ trống.`)
        .max(60, ({ max }) => `${label.name} không được vượt quá ${max} ký tự.`),
    slug: yup
        .string()
        .required(`${label.slug} không được bỏ trống.`),
    short_description: yup.string().notRequired(),
    description: yup
        .string()
        .required(`${label.description} không được bỏ trống.`),
    technical_specifications: yup.array()
        .of(
            yup.object().shape({
                title: yup.string().required(`${label.technical_specifications.title} không được bỏ trống.`),
                content: yup.string().required(`${label.technical_specifications.content} không được bỏ trống.`)
            }).default({ title: '', content: '' })
        )
}))
