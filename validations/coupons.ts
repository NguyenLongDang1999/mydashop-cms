// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    code: 'Code',
    min_buy: 'Đơn hàng tối thiểu',
    date_range: 'Ngày áp dụng',
    discount_type: 'Loại ưu đãi',
    discount_amount: 'Giá ưu đãi'
}

export const schema = toTypedSchema(yup.object({
    code: yup
        .string()
        .required(`${label.code} không được bỏ trống.`)
        .max(30, `${label.code} không được vượt quá 30 ký tự.`),
    min_buy: yup
        .number()
        .required(`${label.min_buy} không được bỏ trống.`),
    date_range: yup
        .object({
            start: yup.string(),
            end: yup.string()
        }),
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
}))
