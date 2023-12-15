<script setup lang="ts">

// ** Types Imports
import type { IAttributeForm, IAttributeValues } from '~/types/attribute.type'

// ** Validations Imports
import { label, schema } from '~/validations/attribute'

// ** useHooks
const categoryList = useCategoryDataList()
const { isPending, mutateAsync } = useAttributeFormInput()
const { handleSubmit, values: attribute, setFieldValue } = useForm<IAttributeForm>({ validationSchema: schema })

// ** Data
const isOpen = ref<boolean>(false)

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync({
        ...values,
        category_id: JSON.stringify(values.category_id),
        attribute_value_id: attribute.attribute_value_id
            ? JSON.stringify((values.attribute_value_id as IAttributeValues[]).map(_v => _v.value))
            : undefined
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
                        Thêm mới thuộc tính
                    </h2>
                </template>

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

                    <div class="col-span-12">
                        <UDivider />
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
