<script setup lang="ts">

// ** Types Imports
import type { ICategory, ICategorySearch, ICategoryTable } from '~/types/category.type'
import type { IRow } from '~/types/core.type'

const columns = [
    {
        key: 'name',
        label: 'Thông tin danh mục',
        class: 'min-w-[200px]'
    },
    {
        key: 'parent_id',
        label: 'Danh mục cha',
        class: 'min-w-[200px]'
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
        key: 'created_at',
        label: 'Ngày tạo',
        class: 'min-w-[120px]'
    },
    {
        key: 'actions',
        label: 'Thao tác',
        class: 'min-w-[100px]'
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

                <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
                    <UTable
                        :rows="dataTable"
                        :columns="columns"
                        :loading="isFetching || isLoading"
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
