// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    title: 'Tên Flash Deals',
    slug: 'Đường dẫn URL',
    status: 'Trạng thái',
    date_range: 'Ngày áp dụng',
    description: 'Mô tả',
    product_id: 'Lựa chọn sản phẩm',
    price: 'Giá tiền',
    special_price: 'Giá ưu đãi',
    special_price_type: 'Loại ưu đãi',
    selling_price: 'Giá bán',
}

export const schema = toTypedSchema(yup.object({
    title: yup
        .string()
        .required(`${label.title} không được bỏ trống.`),
    slug: yup
        .string()
        .required(`${label.slug} không được bỏ trống.`),
    description: yup
        .string()
        .required(`${label.description} không được bỏ trống.`),
    product_id: yup
        .array()
        .of(yup.string())
        .min(1, `${label.product_id} không được bỏ trống.`)
        .default([]),
    product_variants: yup.array()
        .of(
            yup.object().shape({
                price: yup
                    .number()
                    .required(`${label.price} không được bỏ trống.`)
                    .min(0, ({ min }) => `${label.price} phải lớn hơn hoặc bằng ${min}.`),
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
        )
}))
