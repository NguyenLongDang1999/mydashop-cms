<script setup lang="ts">

// ** Types Imports
import type { IProductAttributeValuesSearch } from '~/types/product-attribute.type';

// ** Validations Imports
import { label } from '~/validations/product-attribute-values';

// ** useHooks
const productAttributeDataList = useProductAttributeDataList()

// ** Data
const search = inject('search') as IProductAttributeValuesSearch
const searchTemp = reactive<IProductAttributeValuesSearch>(_clone(search))

// ** Methods
const handleReset = () => {
    _assign(searchTemp, {
        value: undefined,
        product_attribute_id: undefined,
        page: PAGE.CURRENT
    })
    _assign(search, searchTemp)
}
</script>

<template>
    <UForm :state="search">
        <div class="grid gap-4 grid-cols-12">
            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.product_attribute_id"
                    :label="label.product_attribute_id"
                    :options="productAttributeDataList"
                    name="product_attribute_id"
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
