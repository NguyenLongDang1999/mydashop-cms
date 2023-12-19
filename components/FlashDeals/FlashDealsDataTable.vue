<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { IFlashDeals } from '~/types/flash-deals.type'

// ** useHooks
const { search, isFetching, dataTable, dataAggregations } = useFlashDealDataTable()
const { isPending, mutateAsync } = useFlashDealFormDelete()

provide('search', search)
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách Chiến dịch
                </h2>

                <UButton
                    icon="i-heroicons-plus"
                    size="sm"
                    color="primary"
                    variant="solid"
                    label="Thêm Mới"
                    :trailing="false"
                    to="/flash-deals/create"
                />
            </div>
        </template>

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="flashDealsColumns"
                :loading="isFetching || isPending"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }: IRow<IFlashDeals>">
                    <ULink :to="`${ROUTER.FLASH_DEALS}/${row.id}`">
                        <div class="flex items-center gap-1">
                            <span class="capitalize text-primary flex-1 truncate">{{ row.campaign_name }}</span>
                        </div>
                    </ULink>
                </template>

                <template #date_range-data="{ row }: IRow<IFlashDeals>">
                    <span>{{ formatDateTime(row.start_date) }} - {{ formatDateTime(row.end_date) }}</span>
                </template>

                <template #status-data="{ row }: IRow<IFlashDeals>">
                    <UToggle :model-value="row.status === STATUS.ACTIVE" />
                </template>

                <template #popular-data="{ row }: IRow<IFlashDeals>">
                    <UToggle :model-value="row.popular === POPULAR.ACTIVE" />
                </template>

                <template #actions-data="{ row }">
                    <div class="flex gap-2">
                        <UButton
                            icon="i-heroicons-pencil-square"
                            size="sm"
                            color="orange"
                            square
                            variant="solid"
                            :to="`${ROUTER.FLASH_DEALS}/${row.id}`"
                        />

                        <Confirm :remove="() => mutateAsync(row.id)" />
                    </div>
                </template>
            </UTable>
        </div>

        <template #footer>
            <div class="flex flex-wrap justify-center items-center">
                <UPagination
                    v-model="search.page"
                    :page-count="search.pageSize"
                    :total="dataAggregations"
                    :ui="{
                        wrapper: 'flex items-center gap-1',
                        rounded:
                            '!rounded-full min-w-[32px] justify-center',
                        default: {
                            activeButton: {
                                variant: 'outline',
                            },
                        },
                    }"
                />
            </div>
        </template>
    </UCard>
</template>
