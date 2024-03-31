<script setup lang="ts">

// ** Types Imports
import type { IAttributeValues } from '~/types/attribute.type'

// ** Validations Imports
import { label } from '~/validations/attribute'

// ** Props & Emits
interface Props {
    attributeValues: IAttributeValues[]
}

defineProps<Props>()
</script>

<template>
    <FieldArray
        v-slot="{ fields, push, remove }"
        name="attribute_value"
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

        <div
            v-if="fields.length"
            class="col-span-12"
        >
            <div class="flex flex-col gap-4">
                <div
                    v-for="(values, index) in attributeValues"
                    :key="index"
                    class="grid gap-4 grid-cols-12"
                >
                    <div class="col-span-5">
                        <FormInput
                            :label="label.attribute_value"
                            :name="`attribute_value.${index}.value`"
                        />
                    </div>

                    <div class="col-span-3">
                        <div class="mt-6 flex gap-2">
                            <UButton
                                :ui="{ rounded: 'rounded-full' }"
                                icon="i-heroicons-trash"
                                size="sm"
                                color="red"
                                variant="solid"
                                @click="remove(index)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </FieldArray>
</template>
