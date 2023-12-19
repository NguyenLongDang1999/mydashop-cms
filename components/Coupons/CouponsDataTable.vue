<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { ICoupons } from '~/types/coupons.type'

// ** useHooks
const { search, isFetching, dataTable, dataAggregations } = useCouponsDataTable()
const { isPending, mutateAsync } = useCouponsFormDelete()

provide('search', search)
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách Coupons
                </h2>

                <CouponsForm />
            </div>
        </template>

        <CouponsSearch />

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="couponsColumns"
                :loading="isFetching || isPending"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0] truncate' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #code-data="{ row }: IRow<ICoupons>">
                    <span class="capitalize text-primary line-clamp-1 flex-1">{{ row.code }}</span>
                </template>

                <template #min_buy-data="{ row }: IRow<ICoupons>">
                    <span>{{ formatCurrency(Number(row.min_buy)) }}</span>
                </template>

                <template #discount-data="{ row }: IRow<ICoupons>">
                    <div>
                        <template v-if="row.discount_type === SPECIAL_PRICE.PERCENT">
                            {{ row.discount_amount }}%
                        </template>

                        <template v-else>
                            {{ formatCurrency(Number(row.discount_amount)) }}
                        </template>
                    </div>
                </template>

                <template #date_range-data="{ row }: IRow<ICoupons>">
                    <span>{{ formatDateTime(row.discount_start_date) }} - {{ formatDateTime(row.discount_end_date) }}</span>
                </template>

                <template #actions-data="{ row }: IRow<ICoupons>">
                    <div class="flex gap-2">
                        <CouponsUpdate :coupons="row" />

                        <Confirm :remove="() => mutateAsync(row.id as number)" />
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
