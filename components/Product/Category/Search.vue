<script setup lang="ts">

// ** Types Imports
import type { IProductCategorySearch } from '~/types/product-category.type'

// ** Validations Imports
import { label } from '~/validations/product-category'

// ** useHooks
const categoryList = useProductCategoryDataList()

// ** Data
const search = inject('search') as IProductCategorySearch
const searchTemp = reactive<IProductCategorySearch>(_clone(search))

// ** Methods
const handleReset = () => {
    _assign(searchTemp, {
        name: undefined,
        parent_id: undefined,
        status: undefined,
        page: PAGE.CURRENT
    })
    _assign(search, searchTemp)
}
</script>

<template>
    <UForm :state="search">
        <div class="grid gap-4 grid-cols-12">
            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormInput
                    v-model="searchTemp.name"
                    :label="label.name"
                    name="name"
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.parent_id"
                    :label="label.parent_id"
                    :options="categoryList"
                    name="parent_id"
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.status"
                    :label="label.status"
                    :options="optionStatus"
                    name="status"
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
