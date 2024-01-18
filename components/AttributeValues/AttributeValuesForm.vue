<script setup lang="ts">

// ** Types Imports
import type { IAttributeValuesForm } from '~/types/attribute.type'

// ** Validations Imports
import { label, schema } from '~/validations/attribute_values'

// ** useHooks
const attributeValueList = useAttributeDataList()
const { isPending, mutateAsync } = useAttributeValuesFormInput()
const { handleSubmit } = useForm<IAttributeValuesForm>({ validationSchema: schema })

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
        :ui="{ base: 'overflow-visible' }"
    >
        <UForm
            :state="{}"
            @submit="onSubmit"
        >
            <UCard :ui="{ base: 'overflow-visible' }">
                <template #header>
                    <h2 class="capitalize my-0 font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                        Thêm mới thuộc tính (giá trị)
                    </h2>
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="label.attribute_id"
                            :options="attributeValueList"
                            name="attribute_id"
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
