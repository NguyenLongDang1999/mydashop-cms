<script setup lang="ts">

// ** Types Imports
import type { IAttributeForm } from '~/types/attribute.type';

// ** Validations Imports
import { label, schema } from '~/validations/attribute';

// ** Props & Emits
interface Props {
    data: IAttributeForm
}

const props = defineProps<Props>()

// ** useHooks
const categoryList = useCategoryDataList()
const { isPending, mutateAsync } = useAttributeFormInput()

const { handleSubmit, values: attribute, setFieldValue } = useForm<IAttributeForm>({
    validationSchema: schema,
    initialValues: _omitBy(props.data, _isNil)
})

// ** Methods
const onSubmit = handleSubmit(async values => mutateAsync({
    ...values,
    product_category_id: JSON.stringify(values.product_category_id)
}))
</script>

<template>
    <UForm
        :state="{}"
        @submit="onSubmit"
    >
        <UCard>
            <div class="grid gap-4 grid-cols-12">
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
                        :model-value="attribute.product_category_id"
                        :label="label.product_category_id"
                        :options="categoryList"
                        :route-page="ROUTER.CATEGORY"
                        name="product_category_id"
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

                <div class="col-span-12">
                    <FormTextarea
                        :label="label.description"
                        name="description"
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
