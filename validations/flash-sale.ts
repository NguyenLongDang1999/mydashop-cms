// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    name: 'Tên chiến dịch',
    date_range: 'Ngày áp dụng',
    discount_percentage: 'Số tiền giảm',
    product_selected: 'Lựa chọn sản phẩm'
}

export const schema = toTypedSchema(yup.object({
    name: yup
        .string()
        .required(`${label.name} không được bỏ trống.`)
        .max(60, `${label.name} không được vượt quá 60 ký tự.`),
    discount_percentage: yup
        .number()
        .required(`${label.discount_percentage} không được bỏ trống.`),
    date_range: yup
        .object({
            start: yup.string(),
            end: yup.string()
        }),
    start_time: yup.string(),
    end_time: yup.string(),
    product_id: yup.array()
}))
