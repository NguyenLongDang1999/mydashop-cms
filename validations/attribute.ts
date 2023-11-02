// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import type { IAttributeValues } from '~/types/attribute.type'

export const label = {
    name: 'Tên thuộc tính',
    slug: 'Đường dẫn URL',
    category_id: 'Danh mục',
    status: 'Trạng thái',
    description: 'Mô tả',
    attribute_value_id: 'Giá trị thuộc tính'
}

export const schema = toTypedSchema(yup.object({
    name: yup
        .string()
        .required(`${label.name} không được bỏ trống.`)
        .max(60, ({ max }) => `${label.name} không được vượt quá ${max} ký tự.`),
    slug: yup
        .string()
        .required(`${label.slug} không được bỏ trống.`),
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
        .max(160, `${label.description} không được vượt quá 160 ký tự.`),
    attribute_value_id: yup
        .mixed<IAttributeValues[] | string>()
        .test('attribute_value_id', `${label.attribute_value_id} không được bỏ trống.`, value => {
            if (typeof value === 'string' && value.trim() !== '') {
                return true
            }

            return !!(Array.isArray(value) && value.length > 0 && value.every(item => typeof item === 'object' && item.value))
        })
        .default([])
}))
