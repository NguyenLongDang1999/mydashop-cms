<script setup lang="ts">

// ** Types Imports
import type { ICategoryForm } from '~/types/category.type'

// ** Validations Imports
import { label, schema } from '~/validations/category'

// ** Props & Emits
interface Props {
    path: string
    data: ICategoryForm
}

const props = defineProps<Props>()

// ** useHooks
const categoryList = useCategoryDataList()
const { isPending, mutateAsync } = useCategoryFormInput('PATCH')

const { handleSubmit, values: category, setFieldValue } = useForm<ICategoryForm>({
    validationSchema: schema,
    initialValues: _omitBy(props.data, _isNil)
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync(values))
</script>

<template>
    <UForm
        :state="{}"
        @submit="onSubmit"
    >
        <UCard>
            <div class="grid gap-4 grid-cols-12">
                <div class="col-span-12">
                    <FormUpload :image-src="getImageFile(path, category.image_uri)" />
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
                        :label="label.parent_id"
                        :options="categoryList"
                        name="parent_id"
                    />
                </div>

                <div class="sm:col-span-6 col-span-12">
                    <FormSelect
                        :label="label.show_product"
                        :options="optionShowProduct"
                        name="show_product"
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

                <div class="col-span-12">
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
                        :loading="isPending"
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
