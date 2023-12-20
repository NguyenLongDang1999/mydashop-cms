<script setup lang="ts">

// ** Types Imports
import type { ICategorySearch } from '~/types/category.type'

// ** Validations Imports
import { label } from '~/validations/category'

// ** useHooks
const categoryList = useCategoryDataList()

// ** Data
const search = inject('search') as ICategorySearch
const searchTemp = reactive<ICategorySearch>(_clone(search))

// ** Methods
const handleSearch = () => {
    _assign(search, {
        ...searchTemp,
        page: PAGE.CURRENT
    })

    navigateTo(`?${objectToQueryString({ ...search })}`)
}

const handleReset = () => {
    _assign(searchTemp, {
        name: undefined,
        parent_id: undefined,
        status: undefined,
        popular: undefined,
        page: PAGE.CURRENT
    })
    _assign(search, searchTemp)

    navigateTo('?')
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

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.popular"
                    :label="label.popular"
                    :options="optionPopular"
                    name="popular"
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
                        @click="handleSearch"
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
