<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { IProductFlashDeals } from '~/types/product-flash-deals.type'

// ** useHooks
const { isFetching, dataTable, dataAggregations } = useProductFlashDealsDataTable()
const { isPending, mutateAsync } = useProductFlashDealsFormDelete()
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách Flash Deals
                </h2>

                <ProductFlashDealsCreate />
            </div>
        </template>

        <!-- <ProductCollectionSearch /> -->

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="flashDealsColumns"
                :loading="Boolean(isFetching) || Boolean(isPending)"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }: IRow<IProductFlashDeals>">
                    <ULink :to="goToPage(row.id)">
                        <div class="flex items-center gap-1">
                            <div class="flex flex-col flex-1 truncate">
                                <span class="capitalize text-primary truncate">{{ row.title }}</span>
                                <span>{{ row.flashDealProducts.length }} Biến Thể</span>
                            </div>
                        </div>
                    </ULink>
                </template>

                <template #date_range-data="{ row }: IRow<IProductFlashDeals>">
                    <span>{{ formatDateTime(row.start_time) }} - {{ formatDateTime(row.end_time) }}</span>
                </template>

                <template #status-data="{ row }: IRow<IProductFlashDeals>">
                    <UToggle :model-value="String(row.status) === STATUS.ACTIVE" />
                </template>

                <template #actions-data="{ row }: IRow<IProductFlashDeals>">
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
