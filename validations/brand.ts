// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    name: 'Tên thương hiệu',
    slug: 'Đường dẫn URL',
    category_id: 'Danh mục',
    status: 'Trạng thái',
    popular: 'Phổ biến',
    description: 'Mô tả',
    meta_title: 'Meta Title',
    meta_description: 'Meta Description'
}

export const schema = toTypedSchema(yup.object({
    name: yup
        .string()
        .required(`${label.name} không được bỏ trống.`)
        .max(30, `${label.name} không được vượt quá 30 ký tự.`),
    slug: yup
        .string()
        .required(`${label.slug} không được bỏ trống.`),
    image_uri: yup
        .string()
        .notRequired(),
    category_id: yup
        .mixed<number[] | string>()
        .test('category_id', `${label.category_id} không được bỏ trống.`, value => {
            if (Array.isArray(value) && value.length > 0) {
                return true
            }

            return !!(typeof value === 'string' && value.trim() !== '')
        })
        .default([]),
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
