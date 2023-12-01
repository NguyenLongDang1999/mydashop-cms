<script setup lang="ts">

// ** Types Imports
import type { ICategoryList } from '~/types/category.type'
import type { IProductSearch } from '~/types/product.type'

// ** Validations Imports
import { label } from '~/validations/product'

// ** Props & Emits
interface Props {
    categoryId?: number
}

const props = defineProps<Props>()

// ** useHooks
const { path: pathCategory } = useCategory()
const { dataList: categoryList } = useCrudDataList<ICategoryList>(pathCategory.value)

// ** Data
const search = inject('search') as IProductSearch
const searchTemp = reactive<IProductSearch>(_clone(search))

// ** Methods
const handleReset = () => {
    _assign(searchTemp, {
        sku: undefined,
        name: undefined,
        category_id: props.categoryId,
        status: undefined,
        popular: undefined,
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
                    v-model="searchTemp.sku"
                    :label="label.sku"
                    name="sku"
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormInput
                    v-model="searchTemp.name"
                    :label="label.name"
                    name="name"
                />
            </div>

            <div
                v-if="!categoryId"
                class="md:col-span-3 sm:col-span-6 col-span-12"
            >
                <FormSelect
                    v-model="searchTemp.category_id"
                    :label="label.category_id"
                    :options="categoryList"
                    name="category_id"
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
