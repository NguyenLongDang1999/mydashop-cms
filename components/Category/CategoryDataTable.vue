<script setup lang="ts">

// ** Types Imports
import type { ICategory } from '~/types/category.type'
import type { IRow } from '~/types/core.type'

// ** useHooks
const { path, search, isFetching, dataTable, dataAggregations } = useCategoryDataTable()
const { isPending, mutateAsync } = useCategoryFormDelete()

provide('search', search)
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
                :loading="isFetching || isPending"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }: IRow<ICategory>">
                    <ULink :to="`${ROUTER.CATEGORY}/${row.id}`">
                        <div class="flex items-center gap-1">
                            <UAvatar
                                :src="getImageFile(path, row.image_uri)"
                                :alt="row.name"
                            />

                            <div class="flex flex-col flex-1 truncate">
                                <span class="capitalize text-primary truncate">{{ row.name }}</span>
                                <span>{{ row.Product.length }} Sản Phẩm</span>
                            </div>
                        </div>
                    </ULink>
                </template>

                <template #parent_id-data="{ row }: IRow<ICategory>">
                    <ULink
                        v-if="row.parent"
                        :to="`${ROUTER.CATEGORY}/${row.parent.id}`"
                    >
                        <div class="flex items-center gap-1">
                            <UAvatar
                                :src="getImageFile(path, row.parent.image_uri)"
                                :alt="row.parent.name"
                            />

                            <div class="flex flex-col flex-1 truncate">
                                <span class="capitalize text-primary truncate">{{ row.parent.name }}</span>
                                <span>{{ row.parent.Product?.length }} Sản Phẩm</span>
                            </div>
                        </div>
                    </ULink>

                    <span v-else />
                </template>

                <template #status-data="{ row }: IRow<ICategory>">
                    <UToggle :model-value="row.status === STATUS.ACTIVE" />
                </template>

                <template #popular-data="{ row }: IRow<ICategory>">
                    <UToggle :model-value="row.popular === POPULAR.ACTIVE" />
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
                            :to="`${ROUTER.CATEGORY}/${row.id}`"
                        />

                        <Confirm :remove="() => mutateAsync(row.id)" />
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
                    @update:model-value="navigateTo(`?page=${$event}`)"
                />
            </div>
        </template>
    </UCard>
</template>
