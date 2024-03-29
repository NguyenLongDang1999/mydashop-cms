// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

// ** Types Imports
import type { IAttributeValuesList } from '~/types/attribute.type'
import type { IProductUpload } from '~/types/product.type'

export const label = {
    sku: 'Mã sản phẩm',
    name: 'Tên sản phẩm',
    slug: 'Đường dẫn URL',
    category_id: 'Danh mục',
    product_type: 'Loại sản phẩm',
    brand_id: 'Thương hiệu',
    status: 'Trạng thái',
    popular: 'Phổ biến',
    quantity: 'Số lượng',
    price: 'Giá tiền',
    special_price: 'Giá ưu đãi',
    special_price_type: 'Loại ưu đãi',
    in_stock: 'Tình trạng hàng hóa',
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
    category_id: yup
        .number()
        .required(`${label.category_id} không được bỏ trống.`),
    short_description: yup.string().notRequired(),
    description: yup
        .string()
        .required(`${label.description} không được bỏ trống.`),
    attribute_id: yup.array(yup.number().required()),
    attributes: yup.mixed<string | IAttributeValuesList[]>().nullable(),
    technical_specifications: yup.array()
        .of(
            yup.object().shape({
                title: yup.string().required(`${label.technical_specifications.title} không được bỏ trống.`),
                content: yup.string().required(`${label.technical_specifications.content} không được bỏ trống.`)
            }).default({ title: '', content: '' })
        ),
    product_type: yup.number().default(PRODUCT_TYPE.SINGLE),
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
        .number()
        .required(`${label.special_price_type} không được bỏ trống.`)
        .default(SPECIAL_PRICE.PRICE),
    special_price: yup
        .number()
        .required(`${label.special_price} không được bỏ trống.`)
        .default(0)
        .min(0, ({ min }) => `${label.special_price} phải lớn hơn hoặc bằng ${min}.`)
        .when('special_price_type', {
            is: SPECIAL_PRICE.PERCENT,
            // eslint-disable-next-line @typescript-eslint/no-shadow
            then: schema => schema
                .min(0, `${label.special_price} phải lớn hơn hoặc bằng 0.`)
                .max(100, `${label.special_price} phải nhỏ hơn hoặc bằng 100.`)
        }),
    in_stock: yup
        .number()
        .default(INVENTORY_STATUS.OUT_OF_STOCK),
    variants: yup.array()
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
                    .number()
                    .required(`${label.special_price_type} không được bỏ trống.`),
                special_price: yup
                    .number()
                    .required(`${label.special_price} không được bỏ trống.`)
                    .min(0, ({ min }) => `${label.special_price} phải lớn hơn hoặc bằng ${min}.`)
                    .when('special_price_type', {
                        is: SPECIAL_PRICE.PERCENT,
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        then: schema => schema
                            .min(0, `${label.special_price} phải lớn hơn hoặc bằng 0.`)
                            .max(100, `${label.special_price} phải nhỏ hơn hoặc bằng 100.`)
                    }),
                in_stock: yup.number()
            })
        ),
    productImage: yup.mixed<string | IProductUpload[]>().notRequired(),
    related_products: yup.array(yup.number().required()),
    upsell_products: yup.array(yup.number().required()),
    cross_sell_products: yup.array(yup.number().required())
}))
