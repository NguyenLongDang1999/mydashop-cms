<script setup lang="ts">

// ** Types Imports
import type { IBrandForm } from '~/types/brand.type'
import type { ICategoryList } from '~/types/category.type'

// ** Validations Imports
import { label, schema } from '~/validations/brand'

// ** Props & Emits
interface Props {
    path: string
    data: IBrandForm
}

const props = defineProps<Props>()

// ** useHooks
const { path: pathCategory } = useCategory()
const { dataList: categoryList } = useCrudDataList<ICategoryList>(pathCategory.value)
const { isLoading, dataFormInput } = useCrudFormInput<IBrandForm>(props.path)

const { handleSubmit, values: brand, setFieldValue } = useForm({
    validationSchema: schema,
    initialValues: _omitBy(props.data, _isNil)
})

// ** Methods
const onSubmit = handleSubmit(values => dataFormInput({
    ...values,
    category_id: JSON.stringify(values.category_id)
}))
</script>

<template>
    <UForm
        :state="{}"
        @submit="onSubmit"
    >
        <UCard>
            <div class="grid gap-4 grid-cols-12">
                <div class="col-span-12">
                    <FormUpload :image-src="getImageFile(path, brand.image_uri)" />
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
                        :model-value="brand.category_id"
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
                <div class="flex justify-start gap-4">
                    <UButton
                        type="submit"
                        size="sm"
                        variant="solid"
                        label="Cập Nhật"
                        :loading="isLoading"
                        :trailing="false"
                    />

                    <UButton
                        type="reset"
                        size="sm"
                        color="gray"
                        variant="solid"
                        label="Quay Lại"
                        :trailing="false"
                        @click="$router.go(-1)"
                    />
                </div>
            </template>
        </UCard>
    </UForm>
</template>