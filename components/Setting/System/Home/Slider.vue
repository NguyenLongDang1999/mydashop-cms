<script setup lang="ts">

// ** Type Imports
import type { ISettingSystemForm } from '~/types/setting-system.type'

// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const props = defineProps<Props>()

const label = {
    image_uri: 'Ảnh đại diện',
    image_link: 'Đường dẫn URL'
}

const schema = toTypedSchema(yup.object({
    home_slider: yup.array()
        .of(
            yup.object().shape({
                image_uri: yup
                    .string()
                    .required(`${label.image_uri} không được bỏ trống.`),
                image_link: yup
                    .string()
                    .required(`${label.image_link} không được bỏ trống.`)
                    .url(`${label.image_link} không đúng định dạng.`)
            })
        )
}))

// ** Props & Emits
interface Props {
    data: ISettingSystemForm[]
}

// ** useHooks
const { isPending, mutateAsync } = useSettingSystemFormInput()

const { handleSubmit, values: field } = useForm({
    validationSchema: schema,
    initialValues: {
        home_slider: props.data.length && typeof props.data[0].value === 'string' ? JSON.parse(props.data[0].value) : []
    }
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    label: WEBSITE_SETUP.HOME_SLIDER,
    key: 'home_slider',
    value: JSON.stringify(values.home_slider),
    input_type: INPUT_TYPE.TEXT

}))
</script>

<template>
    <UForm
        :state="{}"
        @submit="onSubmit"
    >
        <FieldArray
            v-slot="{ fields, push, remove }"
            name="home_slider"
        >
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12">
                    <div class="flex flex-col gap-4">
                        <div
                            v-for="(field, index) in fields"
                            :key="index"
                            class="grid gap-4 grid-cols-12"
                        >
                            <div class="col-span-12">
                                <FormUpload :name="`home_slider.${index}.image_uri`" />
                            </div>

                            <div class="col-span-6">
                                <FormInput
                                    :label="label.image_link"
                                    :name="`home_slider.${index}.image_link`"
                                />
                            </div>

                            <div class="col-span-2">
                                <UButton
                                    :ui="{ rounded: 'rounded-full' }"
                                    icon="i-heroicons-trash"
                                    size="sm"
                                    color="red"
                                    variant="solid"
                                    class="mt-6"
                                    @click="remove(index)"
                                />
                            </div>

                            <div class="col-span-12">
                                <UDivider />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12">
                    <UButton
                        icon="i-heroicons-plus"
                        size="sm"
                        color="primary"
                        variant="outline"
                        label="Thêm Slider"
                        class="mb-4"
                        block
                        :trailing="false"
                        @click="push({ image_uri: '', image_link: '' })"
                    />
                </div>
            </div>
        </FieldArray>

        <UButton
            v-if="field.home_slider?.length"
            type="submit"
            size="sm"
            variant="solid"
            label="Lưu Lại"
            :loading="Boolean(isPending)"
            :trailing="false"
        />
    </UForm>
</template>
