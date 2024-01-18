// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    value: 'Giá trị thuộc tính',
    attribute_id: 'Thuộc tính'
}

export const schema = toTypedSchema(yup.object({
    value: yup
        .string()
        .required(`${label.value} không được bỏ trống.`)
        .max(60, ({ max }) => `${label.value} không được vượt quá ${max} ký tự.`),
    attribute_id: yup
        .number()
        .required(`${label.attribute_id} không được bỏ trống.`)
}))
