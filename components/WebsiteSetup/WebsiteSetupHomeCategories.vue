<script setup lang="ts">

// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const label = {
    home_categories: 'Danh mục trang chủ'
}

const schema = toTypedSchema(yup.object({
    home_categories: yup.array().notRequired()
}))

// ** useHooks
const categoryList = useCategoryDataList()
const { data } = await useWebsiteSetupDetail(WEBSITE_SETUP.HOME_CATEGORIES)
const { isPending, mutateAsync } = useWebsiteSetupFormInput()

const { handleSubmit, values: system } = useForm({
    validationSchema: schema,
    initialValues: {
        home_categories: typeof data.value.value === 'string' ? JSON.parse(data.value.value) : []
    }
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    id: data.value.id,
    slug: WEBSITE_SETUP.HOME_CATEGORIES,
    value: JSON.stringify(values.home_categories)
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
                        Danh mục trang chủ
                    </h2>
                </div>
            </template>

            <div class="grid gap-4 grid-cols-12 h-80">
                <div class="col-span-12">
                    <FormSelect
                        :model-value="system.home_categories"
                        :label="label.home_categories"
                        :options="categoryList"
                        name="home_categories"
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
