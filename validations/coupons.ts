// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    name: 'Tiêu đề',
    code: 'Code',
    discount: 'Giảm giá',
    discount_type: 'Loại giảm giá',
    expire_date: 'Ngày hết hạn',
    status: 'Trạng thái'
}

export const schema = toTypedSchema(yup.object({
    name: yup
        .string()
        .required(`${label.name} không được bỏ trống.`)
        .max(60, `${label.name} không được vượt quá 60 ký tự.`),
    code: yup
        .string()
        .required(`${label.code} không được bỏ trống.`)
        .max(30, `${label.code} không được vượt quá 30 ký tự.`)
}))
