// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    name: 'Tên slider',
    url: 'Đường dẫn URL',
    status: 'Trạng thái',
    description: 'Mô tả'
}

export const schema = toTypedSchema(yup.object({
    name: yup
        .string()
        .required(`${label.name} không được bỏ trống.`)
        .max(60, ({ max }) => `${label.name} không được vượt quá ${max} ký tự.`),
    url: yup
        .string()
        .required(`${label.url} không được bỏ trống.`)
        .url(`${label.url} không đúng định dạng.`),
    description: yup
        .string()
        .max(160, `${label.description} không được vượt quá 160 ký tự.`)
}))
