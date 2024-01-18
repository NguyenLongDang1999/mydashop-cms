<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { IOrders } from '~/types/orders.type'

// ** useHooks
const { isFetching, dataTable, dataAggregations } = useOrdersDataTable()
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách đơn hàng
                </h2>
            </div>
        </template>

        <OrdersSearch />

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="ordersColumns"
                :loading="Boolean(isFetching)"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }: IRow<IOrders>">
                    <div>
                        <UBadge
                            v-if="row.viewed === STATUS.ACTIVE"
                            size="xs"
                            color="red"
                        >
                            New
                        </UBadge>

                        <ULink :to="goToPage(row.id)">
                            <div class="flex flex-col flex-1 truncate mt-1">
                                <span class="capitalize text-primary truncate">{{ row.code }}</span>
                                <span>{{ row._count.OrderDetails }} Sản Phẩm</span>
                            </div>
                        </ULink>
                    </div>
                </template>

                <template #users-data="{ row }: IRow<IOrders>">
                    <div class="flex flex-col flex-1 truncate">
                        <span>{{ row.name }}</span>
                        <span>{{ row.phone }}</span>
                        <span>{{ row.email }}</span>
                    </div>
                </template>

                <template #grand_total-data="{ row }: IRow<IOrders>">
                    <div class="flex flex-col flex-1 truncate">
                        <span>Giá Gốc: {{ formatCurrency(Number(row.grand_total)) }}</span>
                        <span>Mã Giảm Giá: {{ formatCurrency(Number(row.coupon_discount)) }}{{ row.coupon_discount <= 100 ? '%' : '' }}</span>
                        <span>Tổng Tiền: {{ calculateCartDiscount(Number(row.grand_total), Number(row.coupon_discount)) }}</span>
                    </div>
                </template>

                <template #status-data="{ row }: IRow<IOrders>">
                    <UToggle :model-value="row.status === STATUS.ACTIVE" />
                </template>

                <template #actions-data="{ row }: IRow<IOrders>">
                    <div class="flex gap-2">
                        <UButton
                            icon="i-heroicons-pencil-square"
                            size="sm"
                            color="orange"
                            square
                            variant="solid"
                            :to="goToPage(row.id)"
                        />
                    </div>
                </template>
            </UTable>
        </div>

        <template #footer>
            <Pagination :data-aggregations="dataAggregations" />
        </template>
    </UCard>
</template>
