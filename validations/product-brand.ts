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
        .mixed<string[] | string>()
        .test('product_category_id', `${label.product_category_id} không được bỏ trống.`, value => {
            if (Array.isArray(value) && value.length > 0) {
                return true
            }

            return !!(typeof value === 'string' && value.trim() !== '')
        })
        .default([]),
    description: yup
        .string()
        .notRequired()
}))
