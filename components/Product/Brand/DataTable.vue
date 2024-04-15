<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { IProductBrand } from '~/types/product-brand.type'

// ** useHooks
const { isFetching, dataTable, dataAggregations } = useProductBrandDataTable()
const { isPending, mutateAsync } = useProductBrandFormDelete()
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách thương hiệu
                </h2>

                <ProductBrandCreate />
            </div>
        </template>

        <ProductBrandSearch />

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="brandColumns"
                :loading="Boolean(isFetching) || Boolean(isPending)"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }: IRow<IProductBrand>">
                    <ULink :to="goToPage(row.id)">
                        <div class="flex items-center gap-1">
                            <UAvatar
                                :src="getPathImageFile(row.image_uri)"
                                :alt="row.name"
                            />

                            <span class="capitalize text-primary flex-1 truncate">{{ row.name }}</span>
                        </div>
                    </ULink>
                </template>

                <template #category_id-data="{ row }: IRow<IProductBrand>">
                    <div v-if="row.productCategoryBrand.length">
                        <ULink
                            v-for="category in row.productCategoryBrand.slice(0, 5)"
                            :key="category.id"
                            :to="goToPage(category.id, ROUTER.PRODUCT_CATEGORY)"
                            class="flex items-center gap-1 hover:text-primary-500"
                        >
                            <span class="h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-400" />
                            <span class="truncate capitalize">{{ category.name }}</span>
                        </ULink>
                    </div>

                    <span v-else />
                </template>

                <template #status-data="{ row }: IRow<IProductBrand>">
                    <UToggle :model-value="String(row.status) === STATUS.ACTIVE" />
                </template>

                <template #actions-data="{ row }: IRow<IProductBrand>">
                    <div class="flex gap-2">
                        <UButton
                            icon="i-heroicons-pencil-square"
                            size="sm"
                            color="orange"
                            square
                            variant="solid"
                            :to="goToPage(row.id)"
                        />

                        <Confirm :remove="() => mutateAsync({ id: row.id })" />
                    </div>
                </template>
            </UTable>
        </div>

        <template #footer>
            <Pagination :data-aggregations="dataAggregations" />
        </template>
    </UCard>
</template>
