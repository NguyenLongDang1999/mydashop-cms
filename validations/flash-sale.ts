// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

// ** Types Imports
import type { IProduct } from '~/types/product.type'

export const label = {
    campaign_name: 'Tên chiến dịch',
    date_range: 'Ngày áp dụng',
    discount: 'Số tiền giảm',
    product_selected: 'Lựa chọn sản phẩm'
}

export const schema = toTypedSchema(yup.object({
    campaign_name: yup
        .string()
        .required(`${label.campaign_name} không được bỏ trống.`)
        .max(60, `${label.campaign_name} không được vượt quá 60 ký tự.`),
    discount: yup
        .number()
        .required(`${label.discount} không được bỏ trống.`),
    date_range: yup
        .object({
            start: yup.string(),
            end: yup.string()
        }),
    start_time: yup.string(),
    end_time: yup.string(),
    product_id: yup
        .array<IProduct[]>()
        .min(1)
}))
