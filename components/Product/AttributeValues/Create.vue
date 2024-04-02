<script setup lang="ts">

// ** Validations Imports
import { label, schema } from '~/validations/product-attribute-values'

// ** Types Imports
import type { IProductAttributeValuesForm } from '~/types/product-attribute.type'

// ** useHooks
const productAttributeDataList = useProductAttributeDataList()
const { isPending, mutateAsync } = useProductAttributeValuesFormInput()

const { handleSubmit } = useForm<IProductAttributeValuesForm>({
    validationSchema: schema
})

// ** Data
const isOpen = ref<boolean>(false)

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync(values)
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

    <UModal
        v-model="isOpen"
        prevent-close
    >
        <UForm
            :state="{}"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h2 class="capitalize my-0 font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                            Thêm mới thuộc tính (giá trị)
                        </h2>

                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="isOpen = false"
                        />
                    </div>
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="label.product_attribute_id"
                            :options="productAttributeDataList"
                            name="product_attribute_id"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="label.value"
                            name="value"
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
                            :loading="Boolean(isPending)"
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
