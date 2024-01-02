// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    name: 'Tiêu đề',
    slug: 'Đường dẫn URL',
    status: 'Trạng thái',
    content: 'Nội dung',
    meta_title: 'Meta Title',
    meta_description: 'Meta Description'
}

export const schema = toTypedSchema(yup.object({
    name: yup
        .string()
        .required(`${label.name} không được bỏ trống.`),
    slug: yup
        .string()
        .required(`${label.slug} không được bỏ trống.`),
    content: yup
        .string()
        .required(`${label.content} không được bỏ trống.`),
    meta_title: yup
        .string()
        .max(60, `${label.meta_title} không được vượt quá 60 ký tự.`)
        .notRequired(),
    meta_description: yup
        .string()
        .max(160, `${label.meta_description} không được vượt quá 160 ký tự.`)
        .notRequired()
}))
