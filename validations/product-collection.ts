// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    title: 'Tên bộ sưu tập',
    slug: 'Đường dẫn URL',
    status: 'Trạng thái'
}

export const schema = toTypedSchema(yup.object({
    title: yup
        .string()
        .required(`${label.title} không được bỏ trống.`),
    slug: yup
        .string()
        .required(`${label.slug} không được bỏ trống.`)
}))
