<script setup lang="ts">

// ** Types Imports
import type { IProductAttributeForm } from '~/types/product-attribute.type';

// ** Validations Imports
import { label, schema } from '~/validations/product-attribute';

// ** Props & Emits
interface Props {
    data: IProductAttributeForm
}

const props = defineProps<Props>()

// ** useHooks
const categoryList = useProductCategoryDataList()
const { isPending, mutateAsync } = useProductAttributeFormInput()

const { handleSubmit, values: productAttribute, setFieldValue } = useForm<IProductAttributeForm>({
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
                    <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                        1. Thông tin chung
                    </p>
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
                        :model-value="productAttribute.product_category_id"
                        :label="label.product_category_id"
                        :options="categoryList"
                        :route-page="ROUTER.PRODUCT_CATEGORY"
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

                <div class="col-span-12">
                    <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                        2. Thêm giá trị thuộc tính
                    </p>
                </div>

                <div class="col-span-12">
                    <FieldArray
                        v-slot="{ push, remove }"
                        name="product_attribute_values"
                    >
                        <UButton
                            icon="i-heroicons-plus"
                            size="sm"
                            color="primary"
                            variant="solid"
                            label="Thêm Giá Trị"
                            :trailing="false"
                            @click="push({ value: '' })"
                        />

                        <div class="flex flex-col gap-4 mt-4">
                            <div
                                v-for="(value, index) in productAttribute.product_attribute_values"
                                :key="index"
                                class="grid gap-4 grid-cols-12"
                            >
                                <div class="col-span-6">
                                    <FormInput
                                        :label="label.value"
                                        :name="`product_attribute_values.${index}.value`"
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
                    </FieldArray>
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
