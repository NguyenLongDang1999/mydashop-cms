// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    name: 'Tên danh mục',
    slug: 'Đường dẫn URL',
    parent_id: 'Danh mục cha',
    status: 'Trạng thái',
    show_product: 'Hiển thị trên trang chủ',
    popular: 'Phổ biến',
    description: 'Mô tả',
    meta_title: 'Meta Title',
    meta_description: 'Meta Description'
}

export const schema = toTypedSchema(yup.object({
    name: yup
        .string()
        .required(`${label.name} không được bỏ trống.`)
        .max(60, `${label.name} không được vượt quá 60 ký tự.`),
    slug: yup
        .string()
        .required(`${label.slug} không được bỏ trống.`),
    image_uri: yup
        .string()
        .notRequired(),
    description: yup
        .string()
        .max(160, `${label.description} không được vượt quá 160 ký tự.`)
        .notRequired(),
    meta_title: yup
        .string()
        .max(60, `${label.meta_title} không được vượt quá 60 ký tự.`)
        .notRequired(),
    meta_description: yup
        .string()
        .max(160, `${label.meta_description} không được vượt quá 160 ký tự.`)
        .notRequired()
}))
