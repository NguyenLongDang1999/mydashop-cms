<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { ICoupons, ICouponsSearch, ICouponsTable } from '~/types/coupons.type'

const columns = [
    {
        key: 'name',
        label: 'Tiêu đề'
    },
    {
        key: 'code',
        label: 'Code'
    },
    {
        key: 'discount',
        label: 'Giảm giá'
    },
    {
        key: 'expire_date',
        label: 'Ngày hết hạn'
    },
    {
        key: 'status',
        label: 'Trạng thái'
    },
    {
        key: 'actions',
        label: 'Thao tác'
    }
]

// ** useHooks
const { path, search } = useCoupons()
const { isFetching, dataTable, dataAggregations } = useCrudDataTable<ICouponsTable, ICouponsSearch>(path.value, { params: search })
const { isLoading, dataDelete } = useCrudDelete(path.value)
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý sản phẩm"
            title="Coupons"
        />

        <div class="mt-8 pb-24 max-w-none">
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

                <div class="mt-4">
                    <UTable
                        :rows="dataTable"
                        :columns="columns"
                        :loading="isFetching || isLoading"
                        class="w-full"
                        :ui="{ td: { base: 'max-w-[0] truncate' }, th: { base: 'whitespace-nowrap' } }"
                    >
                        <template #name-data="{ row }: IRow<ICoupons>">
                            <span class="capitalize text-primary line-clamp-1 flex-1">{{ row.name }}</span>
                        </template>

                        <template #status-data="{ row }: IRow<ICoupons>">
                            <UToggle :model-value="row.status === STATUS.ACTIVE" />
                        </template>

                        <template #actions-data="{ row }: IRow<ICoupons>">
                            <div class="flex gap-2">
                                <UButton
                                    icon="i-heroicons-pencil-square"
                                    size="sm"
                                    color="orange"
                                    square
                                    variant="solid"
                                    :to="`${ROUTER.ATTRIBUTE}/${row.id}`"
                                />

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
