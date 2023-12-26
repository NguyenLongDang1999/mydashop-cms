<script setup lang="ts">

// ** Types Imports
import type { IAttributeForm, IAttributeValues } from '~/types/attribute.type'

// ** Validations Imports
import { label, schema } from '~/validations/attribute'

// ** Props & Emits
interface Props {
    data: IAttributeForm
}

const props = defineProps<Props>()

// ** useHooks
const categoryList = useCategoryDataList()
const { isPending, mutateAsync } = useAttributeFormInput()

const { handleSubmit, values: attribute, setFieldValue } = useForm({
    validationSchema: schema,
    initialValues: props.data
})

// ** Methods
const onSubmit = handleSubmit(async values => mutateAsync({
    ...values,
    category_id: JSON.stringify(values.category_id),
    attribute_value_id: attribute.attribute_value_id
        ? JSON.stringify((values.attribute_value_id as IAttributeValues[]).map(_v => _v.value))
        : undefined
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
                        :model-value="attribute.category_id"
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

                <div class="col-span-12">
                    <FormInput
                        :label="label.description"
                        name="description"
                    />
                </div>

                <FieldArray
                    v-slot="{ push, remove }"
                    name="attribute_value_id"
                >
                    <div class="col-span-12">
                        <UButton
                            icon="i-heroicons-plus"
                            size="sm"
                            color="primary"
                            variant="solid"
                            label="Thêm Thuộc Tính"
                            :trailing="false"
                            @click="push({ value: '' })"
                        />
                    </div>

                    <div class="col-span-12">
                        <div class="flex flex-col gap-4">
                            <div
                                v-for="(values, index) in attribute.attribute_value_id"
                                :key="index"
                                class="grid gap-4 grid-cols-12"
                            >
                                <div class="col-span-5">
                                    <FormInput
                                        :label="label.attribute_value_id"
                                        :name="`attribute_value_id.${index}.value`"
                                    />
                                </div>

                                <div class="col-span-3">
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
                            </div>
                        </div>
                    </div>
                </FieldArray>
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
