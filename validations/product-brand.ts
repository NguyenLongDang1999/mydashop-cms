// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    name: 'Tên thương hiệu',
    slug: 'Đường dẫn URL',
    product_category_id: 'Danh mục',
    status: 'Trạng thái',
    description: 'Mô tả'
}

export const schema = toTypedSchema(yup.object({
    name: yup
        .string()
        .required(`${label.name} không được bỏ trống.`),
    slug: yup
        .string()
        .required(`${label.slug} không được bỏ trống.`),
    image_uri: yup
        .string()
        .notRequired(),
    product_category_id: yup
        .array()
        .of(yup.string())
        .min(1, `${label.product_category_id} không được bỏ trống.`)
        .default([]),
    description: yup
        .string()
        .notRequired()
}))
