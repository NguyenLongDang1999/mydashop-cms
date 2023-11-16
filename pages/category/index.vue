<script setup lang="ts">

// ** Types Imports
import type { ICategory, ICategorySearch, ICategoryTable } from '~/types/category.type';
import type { IRow } from '~/types/core.type';

const columns = [
    {
        key: 'name',
        label: 'Thông tin danh mục',
        sortable: true
    },
    {
        key: 'parent_id',
        label: 'Danh mục cha',
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
const { path, search } = useCategory()
const { isFetching, dataTable, dataAggregations } = useCrudDataTable<ICategoryTable, ICategorySearch>(path.value, { params: search })
const { isLoading, dataDelete } = useCrudDelete(path.value)
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý sản phẩm"
            title="Danh mục"
        />

        <div class="mt-8 pb-24 max-w-none">
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
                        <template #name-data="{ row }: IRow<ICategory>">
                            <NuxtLink
                                :to="`${ROUTER.CATEGORY}/${row.id}`"
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

                        <template #parent_id-data="{ row }: IRow<ICategory>">
                            <NuxtLink
                                v-if="row.parent"
                                :to="`${ROUTER.CATEGORY}/${row.parent.id}`"
                                class="inline-block"
                            >
                                <div class="flex items-center gap-1">
                                    <UAvatar
                                        :src="getImageFile(path, row.parent.image_uri)"
                                        :alt="row.parent.name"
                                    />

                                    <span class="capitalize text-primary line-clamp-1 flex-1">{{ row.parent.name }}</span>
                                </div>
                            </NuxtLink>

                            <span v-else />
                        </template>

                        <template #status-data="{ row }: IRow<ICategory>">
                            <UToggle :model-value="row.status === STATUS.ACTIVE" />
                        </template>

                        <template #popular-data="{ row }: IRow<ICategory>">
                            <UToggle :model-value="row.popular === POPULAR.ACTIVE" />
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
