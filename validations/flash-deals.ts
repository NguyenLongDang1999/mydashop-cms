// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

// ** Types Imports
import type { IProduct } from '~/types/product.type'

export const label = {
    campaign_name: 'Tên chiến dịch',
    date_range: 'Ngày áp dụng',
    discount: 'Số tiền giảm',
    product_selected: 'Lựa chọn sản phẩm',
    discount_type: 'Loại ưu đãi',
    discount_amount: 'Giá ưu đãi',
    price: 'Giá gốc',
    status: 'Trạng thái',
    popular: 'Phổ biến'
}

export const schema = toTypedSchema(yup.object({
    campaign_name: yup
        .string()
        .required(`${label.campaign_name} không được bỏ trống.`)
        .max(60, `${label.campaign_name} không được vượt quá 60 ký tự.`),
    date_range: yup
        .object({
            start: yup.string(),
            end: yup.string()
        }),
    product_id: yup
        .array<IProduct[]>()
        .min(1, 'Vui lòng chọn ít nhất 1 sản phẩm.')
        .default([]),
    flashDealsProduct: yup.array()
        .of(
            yup.object().shape({
                discount_type: yup
                    .number()
                    .required(`${label.discount_type} không được bỏ trống.`),
                discount_amount: yup
                    .number()
                    .required(`${label.discount_amount} không được bỏ trống.`)
                    .min(0, ({ min }) => `${label.discount_amount} phải lớn hơn hoặc bằng ${min}.`)
                    .when('discount_type', {
                        is: SPECIAL_PRICE.PERCENT,
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        then: schema => schema
                            .min(0, `${label.discount_amount} phải lớn hơn hoặc bằng 0.`)
                            .max(100, `${label.discount_amount} phải nhỏ hơn hoặc bằng 100.`)
                    })
            })
        )
}))
