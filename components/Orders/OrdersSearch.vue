<script setup lang="ts">

// ** Types Imports
import type { IAttributeValuesSearch } from '~/types/attribute.type'

// ** Validations Imports
import { label } from '~/validations/attribute_values'

// ** useHooks
const attributeValueList = useAttributeDataList()

// ** Data
const search = inject('search') as IAttributeValuesSearch
const searchTemp = reactive<IAttributeValuesSearch>(_clone(search))

// ** Methods
const handleReset = () => {
    _assign(searchTemp, {
        value: undefined,
        attribute_id: undefined
    })
    _assign(search, searchTemp)
}
</script>

<template>
    <UForm :state="search">
        <div class="grid gap-4 grid-cols-12">
            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.attribute_id"
                    :label="label.attribute_id"
                    :options="attributeValueList"
                    name="attribute_id"
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormInput
                    v-model="searchTemp.value"
                    :label="label.value"
                    name="value"
                />
            </div>

            <div class="col-span-12">
                <div class="flex justify-center gap-4">
                    <UButton
                        type="submit"
                        icon="i-heroicons-magnifying-glass"
                        size="sm"
                        variant="solid"
                        label="Tìm Kiếm"
                        :trailing="false"
                        @click="_assign(search, searchTemp)"
                    />

                    <UButton
                        type="reset"
                        icon="i-heroicons-arrow-path"
                        size="sm"
                        color="gray"
                        variant="solid"
                        label="Làm Mới"
                        :trailing="false"
                        @click="handleReset"
                    />
                </div>
            </div>
        </div>
    </UForm>
</template>
