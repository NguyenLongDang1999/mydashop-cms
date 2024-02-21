// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    name: 'Tiêu đề',
    slug: 'Đường dẫn URL',
    subject: 'Tiêu đề Email',
    body: 'Nội dung'
}

export const schema = toTypedSchema(yup.object({
    name: yup
        .string()
        .required(`${label.name} không được bỏ trống.`),
    slug: yup
        .string()
        .required(`${label.slug} không được bỏ trống.`),
    subject: yup
        .string()
        .required(`${label.subject} không được bỏ trống.`),
    body: yup
        .string()
        .required(`${label.body} không được bỏ trống.`),
}))
