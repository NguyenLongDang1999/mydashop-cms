<script setup lang="ts">

// ** Types Imports
import type { ICategory } from '~/types/category.type';
import type { IRow } from '~/types/core.type';

// ** useHooks
const { isFetching, dataTable, dataAggregations } = useCategoryDataTable()
const { isPending, mutateAsync } = useCategoryFormDelete()
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách danh mục
                </h2>

                <CategoryForm />
            </div>
        </template>

        <CategorySearch />

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="categoryColumns"
                :loading="Boolean(isFetching) || Boolean(isPending)"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }: IRow<ICategory>">
                    <ULink :to="goToPage(row.id)">
                        <div class="flex items-center gap-1">
                            <UAvatar
                                :src="getPathImageFile(row.image_uri)"
                                :alt="row.name"
                            />

                            <div class="flex flex-col flex-1 truncate">
                                <span class="capitalize text-primary truncate">{{ row.name }}</span>
                                <span>{{ row.product.length }} Sản Phẩm</span>
                            </div>
                        </div>
                    </ULink>
                </template>

                <template #parent_id-data="{ row }: IRow<ICategory>">
                    <ULink
                        v-if="row.parentCategory"
                        :to="goToPage(row.parentCategory.id)"
                    >
                        <div class="flex items-center gap-1">
                            <UAvatar
                                :src="getPathImageFile(row.parentCategory.image_uri)"
                                :alt="row.parentCategory.name"
                            />

                            <div class="flex flex-col flex-1 truncate">
                                <span class="capitalize text-primary truncate">{{ row.parentCategory.name }}</span>
                                <span>{{ row.parentCategory.product?.length }} Sản Phẩm</span>
                            </div>
                        </div>
                    </ULink>

                    <span v-else />
                </template>

                <template #status-data="{ row }: IRow<ICategory>">
                    <UToggle :model-value="String(row.status) === STATUS.ACTIVE" />
                </template>

                <template #created_at-data="{ row }: IRow<ICategory>">
                    <span>{{ formatDateTime(row.created_at) }}</span>
                </template>

                <template #actions-data="{ row }: IRow<ICategory>">
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
