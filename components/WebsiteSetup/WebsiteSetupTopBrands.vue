<script setup lang="ts">

// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const label = {
    top_brands: 'Top thương hiệu'
}

const schema = toTypedSchema(yup.object({
    top_brands: yup.array().notRequired()
}))

// ** useHooks
const brandList = useBrandDataList()
const { data } = await useWebsiteSetupDetail(WEBSITE_SETUP.TOP_BRANDS)
const { isPending, mutateAsync } = useWebsiteSetupFormInput()

const { handleSubmit, values: system } = useForm({
    validationSchema: schema,
    initialValues: {
        top_brands: typeof data.value.value === 'string' ? JSON.parse(data.value.value) : []
    }
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    id: data.value.id,
    slug: WEBSITE_SETUP.TOP_BRANDS,
    value: JSON.stringify(values.top_brands)
}))
</script>

<template>
    <UForm
        :state="{}"
        @submit="onSubmit"
    >
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                        Top thương hiệu
                    </h2>
                </div>
            </template>

            <div class="grid gap-4 grid-cols-12 h-80">
                <div class="col-span-12">
                    <FormSelect
                        :model-value="system.top_brands"
                        :label="label.top_brands"
                        :options="brandList"
                        name="top_brands"
                        multiple
                    />
                </div>
            </div>

            <template #footer>
                <UButton
                    type="submit"
                    size="sm"
                    variant="solid"
                    label="Lưu Lại"
                    :loading="Boolean(isPending)"
                    :trailing="false"
                />
            </template>
        </UCard>
    </UForm>
</template>
