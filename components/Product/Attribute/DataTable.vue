<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type';
import type { IProductAttribute } from '~/types/product-attribute.type';

// ** useHooks
const { isFetching, dataTable, dataAggregations } = useProductAttributeDataTable()
const { isPending, mutateAsync } = useProductAttributeFormDelete()
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách thuộc tính
                </h2>

                <ProductAttributeCreate />
            </div>
        </template>

        <ProductAttributeSearch />

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="attributeColumns"
                :loading="Boolean(isFetching) || Boolean(isPending)"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }: IRow<IProductAttribute>">
                    <ULink
                        :to="goToPage(row.id)"
                        class="flex"
                    >
                        <div class="flex flex-col flex-1 truncate">
                            <span class="capitalize text-primary truncate">{{ row.name }}</span>
                            <span>{{ row.productAttributeValues.length }} Giá Trị</span>
                        </div>
                    </ULink>
                </template>

                <template #category_id-data="{ row }: IRow<IProductAttribute>">
                    <div v-if="row.productCategoryAttributes.length">
                        <ULink
                            v-for="category in row.productCategoryAttributes"
                            :key="category.id" 
                            :to="goToPage(category.id, ROUTER.PRODUCT_CATEGORY)"
                            class="flex items-center gap-1 hover:text-primary-500"
                        >
                            <span class="h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-400" />
                            <span class="truncate capitalize">{{ category.name }}</span>
                        </ULink>
                    </div>

                    <span v-else />
                </template>

                <template #status-data="{ row }: IRow<IProductAttribute>">
                    <UToggle :model-value="String(row.status) === STATUS.ACTIVE" />
                </template>

                <template #created_at-data="{ row }: IRow<IProductAttribute>">
                    <span>{{ formatDateTime(row.created_at) }}</span>
                </template>

                <template #actions-data="{ row }: IRow<IProductAttribute>">
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
