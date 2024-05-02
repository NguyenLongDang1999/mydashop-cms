<script setup lang="ts">

// ** Types Imports
import type { IProductSearch } from '~/types/product.type'

// ** Validations Imports
import { label } from '~/validations/product'

// ** Props && Emits
interface Props {
    productCategoryId?: string
}

const props = defineProps<Props>()

// ** useHooks
const categoryList = useProductCategoryDataList()

// ** Data
const search = inject('search') as IProductSearch
const searchTemp = reactive<IProductSearch>(_clone(search))

// ** Methods
const handleReset = () => {
    _assign(searchTemp, {
        sku: undefined,
        name: undefined,
        product_category_id: props.productCategoryId,
        product_brand_id: undefined,
        status: undefined,
        product_type: undefined
    })
    _assign(search, searchTemp)
}
</script>

<template>
    <UForm :state="search">
        <div class="grid gap-4 grid-cols-12">
            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormInput
                    v-model="searchTemp.sku"
                    :label="label.sku"
                    name="sku"
                    search
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormInput
                    v-model="searchTemp.name"
                    :label="label.name"
                    name="name"
                    search
                />
            </div>

            <div
                v-if="!productCategoryId"
                class="md:col-span-3 sm:col-span-6 col-span-12"
            >
                <FormSelect
                    v-model="searchTemp.product_category_id"
                    :label="label.product_category_id"
                    :options="categoryList"
                    name="product_category_id"
                    search
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.status"
                    :label="label.status"
                    :options="optionStatus"
                    name="status"
                    search
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.product_type"
                    :label="label.product_type"
                    :options="optionProductType"
                    name="product_type"
                    search
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
