<script setup lang="ts">

// ** Types Imports
import type { IAttribute } from '~/types/attribute.type'
import type { IRow } from '~/types/core.type'

// ** useHooks
const { isFetching, dataTable, dataAggregations } = useAttributeDataTable()
const { isPending, mutateAsync } = useAttributeFormDelete()
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách thuộc tính
                </h2>

                <AttributeForm />
            </div>
        </template>

        <AttributeSearch />

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="attributeColumns"
                :loading="Boolean(isFetching) || Boolean(isPending)"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }: IRow<IAttribute>">
                    <ULink
                        :to="goToPage(row.id)"
                        class="flex"
                    >
                        <span class="capitalize text-primary flex-1 truncate">{{ row.name }}</span>
                    </ULink>
                </template>

                <template #category_id-data="{ row }: IRow<IAttribute>">
                    <div
                        v-if="row.productCategoryAttributes.length"
                        class="flex flex-wrap gap-1"
                    >
                        <UButton
                            v-for="category in row.productCategoryAttributes"
                            :key="category.id"
                            :label="category.name"
                            :to="goToPage(category.id, ROUTER.CATEGORY)"
                            size="xs"
                            color="gray"
                            variant="solid"
                        />
                    </div>

                    <span v-else />
                </template>

                <template #status-data="{ row }: IRow<IAttribute>">
                    <UToggle :model-value="String(row.status) === STATUS.ACTIVE" />
                </template>

                <template #actions-data="{ row }: IRow<IAttribute>">
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
