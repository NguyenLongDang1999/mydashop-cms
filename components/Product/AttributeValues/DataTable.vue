<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type';
import type { IProductAttributeValue } from '~/types/product-attribute.type';

// ** useHooks
const { isFetching, dataTable, dataAggregations } = useProductAttributeValuesDataTable()
const { isPending, mutateAsync } = useProductAttributeValuesFormDelete()
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách thuộc tính (giá trị)
                </h2>

                <ProductAttributeValuesCreate />
            </div>
        </template>

        <ProductAttributeValuesSearch />

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="attributeValuesColumns"
                :loading="Boolean(isFetching) || Boolean(isPending)"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }: IRow<IProductAttributeValue>">
                    <ULink
                        :to="goToPage(row.productAttribute.id, ROUTER.PRODUCT_ATTRIBUTE)"
                        class="flex"
                    >
                        <div class="flex flex-col flex-1 truncate">
                            <span class="capitalize text-primary truncate">{{ row.productAttribute.name }}</span>
                        </div>
                    </ULink>
                </template>

                <template #value-data="{ row }: IRow<IProductAttributeValue>">
                    <div class="flex flex-col flex-1 truncate">
                        <span class="capitalize truncate">{{ row.value }}</span>
                    </div>
                </template>

                <template #actions-data="{ row }: IRow<IProductAttributeValue>">
                    <div class="flex gap-2">
                        <ProductAttributeValuesRetrieve 
                            :product-attribute-value="{
                                id: row.id,
                                value: row.value,
                                product_attribute_id: row.productAttribute.id,
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
