<script setup lang="ts">

// ** Types Imports
import type { IAttributeValue } from '~/types/attribute.type'
import type { IRow } from '~/types/core.type'

// ** useHooks
const { isFetching, dataTable, dataAggregations } = useAttributeValuesDataTable()
const { isPending, mutateAsync } = useAttributeValuesFormDelete()
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách thuộc tính (giá trị)
                </h2>

                <AttributeValuesForm />
            </div>
        </template>

        <AttributeValuesSearch />

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="attributeValuesColumns"
                :loading="Boolean(isFetching) || Boolean(isPending)"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }: IRow<IAttributeValue>">
                    <ULink
                        :to="goToPage(row.attribute.id, ROUTE.ATTRIBUTE)"
                        class="flex"
                    >
                        <span class="capitalize text-primary flex-1 truncate">{{ row.attribute.name }}</span>
                    </ULink>
                </template>

                <template #values-data="{ row }: IRow<IAttributeValue>">
                    <span class="capitalize truncate">{{ row.value }}</span>
                </template>

                <template #actions-data="{ row }: IRow<IAttributeValue>">
                    <div class="flex gap-2">
                        <AttributeValuesUpdate
                            :attribute-values="{
                                id: row.id,
                                value: row.value,
                                attribute_id: row.attribute.id,
                            }"
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
