// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    label: 'Tiêu đề',
    key: 'Key',
    value: 'Value',
    description: 'Mô tả',
    input_type: 'Loại nhập dữ liệu',
    setting_system_options: {
        id: 'Key',
        name: 'Value'
    }
}

export const schema = toTypedSchema(yup.object({
    label: yup
        .string()
        .required(`${label.label} không được bỏ trống.`),
    key: yup
        .string()
        .required(`${label.key} không được bỏ trống.`),
    input_type: yup
        .string()
        .required(`${label.input_type} không được bỏ trống.`),
    setting_system_options: yup.array()
        .of(
            yup.object().shape({
                id: yup.string().required(`${label.setting_system_options.id} không được bỏ trống.`),
                name: yup.string().required(`${label.setting_system_options.name} không được bỏ trống.`)
            }).default({ id: '', name: '' })
        )
}))
