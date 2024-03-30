// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    name: 'Tên danh mục',
    slug: 'Đường dẫn URL',
    parent_id: 'Danh mục cha',
    status: 'Trạng thái',
    description: 'Mô tả',
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
    image_uri: yup
        .string()
        .notRequired(),
    description: yup
        .string()
        .notRequired(),
    meta_title: yup
        .string()
        .notRequired(),
    meta_description: yup
        .string()
        .notRequired()
}))
