<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { IFlashSale, IFlashSaleSearch, IFlashSaleTable } from '~/types/flash-sale.type'

const columns = [
    {
        key: 'name',
        label: 'Tên chiến dịch',
        class: 'min-w-[200px]'
    },
    {
        key: 'date_range',
        label: 'Ngày áp dụng',
        class: 'min-w-[250px]'
    },
    {
        key: 'discount',
        label: 'Số tiền giảm'
    },
    {
        key: 'actions',
        label: 'Thao tác',
        class: 'min-w-[100px]'
    }
]

// ** useHooks
const { path, search } = useFlashSale()
const { isFetching, dataTable, dataAggregations } = useCrudDataTable<IFlashSaleTable, IFlashSaleSearch>(path.value, { params: search })
const { isLoading, dataDelete } = useCrudDelete(path.value)
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý sản phẩm"
            title="Flash Sale"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UCard>
                <template #header>
                    <div class="flex justify-between items-center">
                        <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                            Danh sách Flash Sale
                        </h2>

                        <FlashSaleForm />
                    </div>
                </template>

                <!-- <FlashSaleSearch /> -->

                <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
                    <UTable
                        :rows="dataTable"
                        :columns="columns"
                        :loading="isFetching || isLoading"
                        class="w-full"
                        :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
                    >
                        <template #name-data="{ row }: IRow<IFlashSale>">
                            <div class="flex items-center gap-1">
                                <span class="capitalize text-primary flex-1 truncate">{{ row.campaign_name }}</span>
                            </div>
                        </template>

                        <template #date_range-data="{ row }: IRow<IFlashSale>">
                            <span>{{ formatDateTime(row.start_date) }} - {{ formatDateTime(row.end_date) }}</span>
                        </template>

                        <template #discount-data="{ row }: IRow<IFlashSale>">
                            {{ row.discount }}%
                        </template>

                        <template #actions-data="{ row }">
                            <div class="flex gap-2">
                                <FlashSaleUpdate :flash-sale="row" />
                                <Confirm :remove="() => dataDelete(row.id)" />
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
        </div>
    </section>
</template>
