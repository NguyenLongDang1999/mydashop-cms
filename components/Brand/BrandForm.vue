<script setup lang="ts">

// ** Types Imports
import type { IBrandForm } from '~/types/brand.type'

// ** Validations Imports
import { label, schema } from '~/validations/brand'

// ** useHooks
const categoryList = useCategoryDataList()
const { isPending, mutateAsync } = useBrandFormInput()
const { handleSubmit, setFieldValue } = useForm<IBrandForm>({ validationSchema: schema })

// ** Data
const isOpen = ref<boolean>(false)

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync({
        ...values,
        category_id: JSON.stringify(values.category_id)
    })

    isOpen.value = false
})
</script>

<template>
    <UButton
        icon="i-heroicons-plus"
        size="sm"
        color="primary"
        variant="solid"
        label="Thêm Mới"
        :trailing="false"
        @click="isOpen = true"
    />

    <UModal v-model="isOpen">
        <UForm
            :state="{}"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <h2 class="capitalize my-0 font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                        Thêm mới thương hiệu
                    </h2>
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="col-span-12">
                        <FormUpload />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="label.name"
                            name="name"
                            @update:model-value="val => setFieldValue('slug', slugify(val))"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="label.slug"
                            name="slug"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="label.category_id"
                            :options="categoryList"
                            name="category_id"
                            multiple
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="label.status"
                            :options="optionStatus"
                            name="status"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="label.popular"
                            :options="optionPopular"
                            name="popular"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="label.description"
                            name="description"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormInput
                            :label="label.meta_title"
                            name="meta_title"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormInput
                            :label="label.meta_description"
                            name="meta_description"
                        />
                    </div>
                </div>

                <template #footer>
                    <div class="flex justify-center gap-4">
                        <UButton
                            type="submit"
                            size="sm"
                            variant="solid"
                            label="Thêm Mới"
                            :loading="isPending"
                            :trailing="false"
                        />

                        <UButton
                            type="reset"
                            size="sm"
                            color="gray"
                            variant="solid"
                            label="Huỷ Bỏ"
                            :trailing="false"
                            @click="isOpen = false"
                        />
                    </div>
                </template>
            </UCard>
        </UForm>
    </UModal>
</template>
