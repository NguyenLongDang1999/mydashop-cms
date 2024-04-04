<script setup lang="ts">

// ** Types Imports
import type { IProductCategoryForm } from '~/types/product-category.type'

// ** Validations Imports
import { label, schema } from '~/validations/product-category'

// ** Props & Emits
interface Props {
    data: IProductCategoryForm
}

const props = defineProps<Props>()

// ** useHooks
const categoryList = useProductCategoryDataList()
const { isPending, mutateAsync } = useProductCategoryFormInput()

const { handleSubmit, setFieldValue } = useForm<IProductCategoryForm>({
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
                        :label="label.parent_id"
                        :options="categoryList"
                        name="parent_id"
                    />
                </div>

                <div class="sm:col-span-6 col-span-12">
                    <FormSelect
                        :label="label.status"
                        :options="optionStatus"
                        name="status"
                    />
                </div>

                <div class="col-span-12">
                    <FormTextarea
                        :label="label.description"
                        name="description"
                    />
                </div>

                <div class="col-span-12">
                    <FormTextarea
                        :label="label.meta_title"
                        name="meta_title"
                    />
                </div>

                <div class="col-span-12">
                    <FormTextarea
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
                        :loading="Boolean(isPending)"
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
