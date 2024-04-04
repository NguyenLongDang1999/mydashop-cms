<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { IProductCollection } from '~/types/product-collection.type'

// ** useHooks
const { isFetching, dataTable, dataAggregations } = useProductCollectionDataTable()
const { isPending, mutateAsync } = useProductCollectionFormDelete()
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách bộ sưu tập
                </h2>

                <ProductCollectionCreate />
            </div>
        </template>

        <ProductCollectionSearch />

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="collectionColumns"
                :loading="Boolean(isFetching) || Boolean(isPending)"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }: IRow<IProductCollection>">
                    <ULink :to="goToPage(row.id)">
                        <div class="flex items-center gap-1">
                            <div class="flex flex-col flex-1 truncate">
                                <span class="capitalize text-primary truncate">{{ row.title }}</span>
                                <span>{{ row.product.length }} Sản Phẩm</span>
                            </div>
                        </div>
                    </ULink>
                </template>

                <template #status-data="{ row }: IRow<IProductCollection>">
                    <UToggle :model-value="String(row.status) === STATUS.ACTIVE" />
                </template>

                <template #created_at-data="{ row }: IRow<IProductCollection>">
                    <span>{{ formatDateTime(row.created_at) }}</span>
                </template>

                <template #actions-data="{ row }: IRow<IProductCollection>">
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
