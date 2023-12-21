// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    folder_name: 'Tên Folder'
}

export const schema = toTypedSchema(yup.object({
    folder_name: yup
        .string()
        .required(`${label.folder_name} không được bỏ trống.`)
}))
