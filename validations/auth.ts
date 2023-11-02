// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    email: 'Email',
    password: 'Mật khẩu'
}

export const schema = toTypedSchema(yup.object({
    email: yup
        .string()
        .email(`${label.email} không đúng định dạng.`)
        .required(`${label.email} không được bỏ trống.`),
    password: yup
        .string()
        .required(`${label.password} không được bỏ trống.`)
        .min(6, `${label.password} phải từ 6 - 20 ký tự.`)
        .max(20, `${label.password} phải từ 6 - 20 ký tự.`)
}))
