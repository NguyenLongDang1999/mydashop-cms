<script setup lang="ts">

// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const label = {
    image_uri: 'Ảnh đại diện',
    image_link: 'Đường dẫn URL'
}

const schema = toTypedSchema(yup.object({
    home_banner3: yup.array()
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

// ** useHooks
const { data } = await useWebsiteSetupDetail(WEBSITE_SETUP.HOME_BANNER3)
const { isPending, mutateAsync } = useWebsiteSetupFormInput()

const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
        home_banner3: typeof data.value.value === 'string' ? JSON.parse(data.value.value) : []
    }
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    id: data.value.id,
    slug: WEBSITE_SETUP.HOME_BANNER3,
    value: JSON.stringify(values.home_banner3)
}))
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Banner Level 3
                </h2>
            </div>
        </template>

        <UForm
            :state="{}"
            @submit="onSubmit"
        >
            <FieldArray
                v-slot="{ fields, push, remove }"
                name="home_banner3"
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
                                    <FormUpload :name="`home_banner3.${index}.image_uri`" />
                                </div>

                                <div class="col-span-6">
                                    <FormInput
                                        :label="label.image_link"
                                        :name="`home_banner3.${index}.image_link`"
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
                            v-if="fields.length < 3"
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
                type="submit"
                size="sm"
                variant="solid"
                label="Lưu Lại"
                :loading="Boolean(isPending)"
                :trailing="false"
            />
        </UForm>
    </UCard>
</template>
