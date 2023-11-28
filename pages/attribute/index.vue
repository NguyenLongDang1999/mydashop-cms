<script setup lang="ts">

// ** Types Imports
import type { IAttribute, IAttributeSearch, IAttributeTable } from '~/types/attribute.type'
import type { IRow } from '~/types/core.type'

const columns = [
    {
        key: 'name',
        label: 'Thông tin thuộc tính',
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
        key: 'actions',
        label: 'Thao tác',
        class: 'min-w-[100px]'
    }
]

// ** useHooks
const { path, search } = useAttribute()
const { isFetching, dataTable, dataAggregations } = useCrudDataTable<IAttributeTable, IAttributeSearch>(path.value, { params: search })
const { isLoading, dataDelete } = useCrudDelete(path.value)
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý sản phẩm"
            title="Thuộc tính"
        />

        <div class="mt-8 pb-24 max-w-none">
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
                        :columns="columns"
                        :loading="isFetching || isLoading"
                        class="w-full"
                        :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
                    >
                        <template #name-data="{ row }: IRow<IAttribute>">
                            <ULink
                                :to="`${ROUTER.ATTRIBUTE}/${row.id}`"
                                class="flex"
                            >
                                <span class="capitalize text-primary flex-1 truncate">{{ row.name }}</span>
                            </ULink>
                        </template>

                        <template #category_id-data="{ row }: IRow<IAttribute>">
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

                        <template #status-data="{ row }: IRow<IAttribute>">
                            <UToggle :model-value="row.status === STATUS.ACTIVE" />
                        </template>

                        <template #actions-data="{ row }: IRow<IAttribute>">
                            <div class="flex gap-2">
                                <UButton
                                    icon="i-heroicons-pencil-square"
                                    size="sm"
                                    color="orange"
                                    square
                                    variant="solid"
                                    :to="`${ROUTER.ATTRIBUTE}/${row.id}`"
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
