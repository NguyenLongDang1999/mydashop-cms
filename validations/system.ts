// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

export const label = {
    website_name: 'Tiêu đề website',
    website_motto: 'Phương châm website',
    website_favicon: 'Favicon website',
    website_colour: 'Màu chủ đạo website',
    website_logo: 'Logo',
    meta_title: 'Meta Title',
    meta_description: 'Meta Description'
}

export const schema = toTypedSchema(yup.object({
    website_name: yup.string().notRequired(),
    website_motto: yup.string().notRequired(),
    website_favicon: yup.string().notRequired(),
    website_logo: yup.string().notRequired(),
    website_colour: yup.string().notRequired()
}))
