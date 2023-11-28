<script setup lang="ts">

// ** Types Imports
import type { IBrand, IBrandSearch, IBrandTable } from '~/types/brand.type'
import type { IRow } from '~/types/core.type'

const columns = [
    {
        key: 'name',
        label: 'Thông tin thương hiệu',
        class: 'min-w-[180px]'
    },
    {
        key: 'category_id',
        label: 'Danh mục',
        class: 'min-w-[250px]'
    },
    {
        key: 'status',
        label: 'Trạng thái'
    },
    {
        key: 'popular',
        label: 'Phổ biến'
    },
    {
        key: 'actions',
        label: 'Thao tác',
        class: 'min-w-[100px]'
    }
]

// ** useHooks
const { path, search } = useBrand()
const { isFetching, dataTable, dataAggregations } = useCrudDataTable<IBrandTable, IBrandSearch>(path.value, { params: search })
const { isLoading, dataDelete } = useCrudDelete(path.value)
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý sản phẩm"
            title="Thương hiệu"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UCard>
                <template #header>
                    <div class="flex justify-between items-center">
                        <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                            Danh sách thương hiệu
                        </h2>

                        <BrandForm />
                    </div>
                </template>

                <BrandSearch />

                <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
                    <UTable
                        :rows="dataTable"
                        :columns="columns"
                        :loading="isFetching || isLoading"
                        class="w-full"
                        :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
                    >
                        <template #name-data="{ row }: IRow<IBrand>">
                            <ULink :to="`${ROUTER.BRAND}/${row.id}`">
                                <div class="flex items-center gap-1">
                                    <UAvatar
                                        :src="getImageFile(path, row.image_uri)"
                                        :alt="row.name"
                                    />

                                    <span class="capitalize text-primary flex-1 truncate">{{ row.name }}</span>
                                </div>
                            </ULink>
                        </template>

                        <template #category_id-data="{ row }: IRow<IBrand>">
                            <div
                                v-if="row.categories.length"
                                class="flex flex-wrap gap-1"
                            >
                                <UButton
                                    v-for="category in row.categories"
                                    :key="category.id"
                                    :label="category.name"
                                    :to="`${ROUTER.CATEGORY}/${category.id}`"
                                    size="xs"
                                    color="gray"
                                    variant="solid"
                                />
                            </div>

                            <span v-else />
                        </template>

                        <template #status-data="{ row }: IRow<IBrand>">
                            <UToggle :model-value="row.status === STATUS.ACTIVE" />
                        </template>

                        <template #popular-data="{ row }: IRow<IBrand>">
                            <UToggle :model-value="row.popular === POPULAR.ACTIVE" />
                        </template>

                        <template #actions-data="{ row }: IRow<IBrand>">
                            <div class="flex gap-2">
                                <UButton
                                    icon="i-heroicons-pencil-square"
                                    size="sm"
                                    color="orange"
                                    square
                                    variant="solid"
                                    :to="`${ROUTER.BRAND}/${row.id}`"
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
