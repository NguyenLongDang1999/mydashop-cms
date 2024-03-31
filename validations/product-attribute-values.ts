// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    value: 'Giá trị thuộc tính',
    product_attribute_id: 'Thuộc tính'
}

export const schema = toTypedSchema(yup.object({
    value: yup
        .string()
        .required(`${label.value} không được bỏ trống.`),
    product_attribute_id: yup
        .string()
        .required(`${label.product_attribute_id} không được bỏ trống.`)
}))
