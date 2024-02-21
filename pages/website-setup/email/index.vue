<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type';
import type { IPages } from '~/types/pages.type';

// ** useHooks
const { isFetching, dataTable, dataAggregations } = usePagesDataTable()
const { isPending, mutateAsync } = usePagesFormDelete()
</script>

<template>
    <section>
        <TheTitle
            label="Thiết lập WEBSITE"
            title="Thiết lập Email"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UCard>
                <template #header>
                    <div class="flex justify-between items-center">
                        <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                            Danh sách Email
                        </h2>

                        <UButton
                            icon="i-heroicons-plus"
                            size="sm"
                            color="primary"
                            variant="solid"
                            label="Thêm Mới"
                            :trailing="false"
                            to="/website-setup/email/create"
                        />
                    </div>
                </template>

                <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
                    <UTable
                        :rows="dataTable"
                        :columns="pagesColumns"
                        :loading="Boolean(isFetching) || Boolean(isPending)"
                        class="w-full"
                        :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
                    >
                        <template #name-data="{ row }: IRow<IPages>">
                            <ULink :to="goToPage(row.id)">
                                <span class="capitalize text-primary truncate">{{ row.name }}</span>
                            </ULink>
                        </template>

                        <template #status-data="{ row }: IRow<IPages>">
                            <UToggle :model-value="row.status === STATUS.ACTIVE" />
                        </template>

                        <template #created_at-data="{ row }: IRow<IPages>">
                            <span>{{ formatDateTime(row.created_at) }}</span>
                        </template>

                        <template #actions-data="{ row }: IRow<IPages>">
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
        </div>
    </section>
</template>
