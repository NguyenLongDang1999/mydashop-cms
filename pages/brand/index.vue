<script setup lang="ts">

// ** Types Imports
import type { IBrand, IBrandSearch, IBrandTable } from '~/types/brand.type';
import type { IRow } from '~/types/core.type';

const columns = [
    {
        key: 'name',
        label: 'Thông tin thương hiệu',
        sortable: true
    },
    {
        key: 'category_id',
        label: 'Danh mục',
        sortable: true
    },
    {
        key: 'status',
        label: 'Trạng thái',
        sortable: true
    },
    {
        key: 'popular',
        label: 'Phổ biến',
        sortable: true
    },
    {
        key: 'actions',
        label: 'Thao tác',
        sortable: false
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

                <div class="mt-4">
                    <UTable
                        :rows="dataTable"
                        :columns="columns"
                        :loading="isFetching || isLoading"
                        sort-asc-icon="i-heroicons-arrow-up"
                        sort-desc-icon="i-heroicons-arrow-down"
                        class="w-full"
                        :ui="{ td: { base: 'max-w-[0] truncate' }, th: { base: 'whitespace-nowrap' } }"
                    >
                        <template #name-data="{ row }: IRow<IBrand>">
                            <NuxtLink
                                :to="`${ROUTER.BRAND}/${row.id}`"
                                class="inline-block"
                            >
                                <div class="flex items-center gap-1">
                                    <UAvatar
                                        :src="getImageFile(path, row.image_uri)"
                                        :alt="row.name"
                                    />

                                    <span class="capitalize text-primary line-clamp-1 flex-1">{{ row.name }}</span>
                                </div>
                            </NuxtLink>
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
                            <UBadge
                                size="xs"
                                :label="valueTransform(optionStatus, row.status)?.name"
                                :color="valueTransform(optionStatus, row.status)?.color"
                                variant="subtle"
                                class="capitalize"
                            />
                        </template>

                        <template #popular-data="{ row }">
                            <UBadge
                                size="xs"
                                :label="valueTransform(optionPopular, row.popular)?.name"
                                :color="valueTransform(optionStatus, row.popular)?.color"
                                variant="subtle"
                                class="capitalize"
                            />
                        </template>

                        <template #actions-data="{ row }">
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
