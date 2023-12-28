<script setup lang="ts">

// ** Types Imports
import type { IAttributeValues } from '~/types/attribute.type'

// ** Validations Imports
import { label } from '~/validations/attribute'

// ** Props & Emits
interface Props {
    editPages?: boolean
    attributeValues: IAttributeValues[]
}

defineProps<Props>()

// ** useHooks
const { isPending, mutateAsync } = useAttributeValuesFormInput()
</script>

<template>
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
                    v-for="(values, index) in attributeValues"
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
                        <div class="mt-6 flex gap-2">
                            <UButton
                                v-if="editPages"
                                :ui="{ rounded: 'rounded-full' }"
                                icon="i-heroicons-pencil-square"
                                size="sm"
                                color="orange"
                                square
                                variant="solid"
                                :loading="Boolean(isPending)"
                                @click="mutateAsync({
                                    id: values.id,
                                    value: values.value
                                })"
                            />

                            <UButton
                                :ui="{ rounded: 'rounded-full' }"
                                icon="i-heroicons-trash"
                                size="sm"
                                color="red"
                                variant="solid"
                                :loading="Boolean(isPending)"
                                @click="remove(index)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </FieldArray>
</template>
