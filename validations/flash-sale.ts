// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    campaign_name: 'Tên chiến dịch',
    date_range: 'Ngày áp dụng',
    discount_percent: 'Số tiền giảm',
    product_selected: 'Lựa chọn sản phẩm'
}

export const schema = toTypedSchema(yup.object({
    campaign_name: yup
        .string()
        .required(`${label.campaign_name} không được bỏ trống.`)
        .max(60, `${label.campaign_name} không được vượt quá 60 ký tự.`),
    discount_percent: yup
        .number()
        .required(`${label.discount_percent} không được bỏ trống.`),
    date_range: yup
        .object({
            start: yup.string(),
            end: yup.string()
        }),
    start_date: yup.string(),
    end_date: yup.string(),
    product_id: yup.array()
}))
