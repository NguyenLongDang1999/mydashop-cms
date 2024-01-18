<script setup lang="ts">

// ** Types Imports
import type { IAttributeValuesForm } from '~/types/attribute.type'

// ** Validations Imports
import { label, schema } from '~/validations/attribute_values'

// ** Props & Emits
interface Props {
    attributeValues: IAttributeValuesForm
}

const props = defineProps<Props>()

// ** useHooks
const attributeValueList = useAttributeDataList()
const { isPending, mutateAsync } = useAttributeValuesFormInput()

const { handleSubmit } = useForm<IAttributeValuesForm>({
    validationSchema: schema,
    initialValues: _omitBy(props.attributeValues, _isNil)
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
        icon="i-heroicons-pencil-square"
        size="sm"
        color="orange"
        square
        variant="solid"
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
                        Cập nhật thuộc tính (giá trị)
                    </h2>
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :model-value="attributeValues.attribute_id"
                            :label="label.attribute_id"
                            :options="attributeValueList"
                            name="attribute_id"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :model-value="attributeValues.value"
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
                            label="Cập Nhật"
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
