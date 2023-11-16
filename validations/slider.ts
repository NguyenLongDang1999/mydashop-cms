// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    name: 'Tên slider',
    slug: 'Đường dẫn URL',
    status: 'Trạng thái',
    description: 'Mô tả'
}

export const schema = toTypedSchema(yup.object({
    name: yup
        .string()
        .required(`${label.name} không được bỏ trống.`)
        .max(60, ({ max }) => `${label.name} không được vượt quá ${max} ký tự.`),
    slug: yup
        .string()
        .required(`${label.slug} không được bỏ trống.`),
    description: yup
        .string()
        .max(160, `${label.description} không được vượt quá 160 ký tự.`)
}))
