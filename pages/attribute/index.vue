<script setup lang="ts">

// ** Types Imports
import type { IAttribute, IAttributeSearch, IAttributeTable } from '~/types/attribute.type'
import type { IRow } from '~/types/core.type'

const columns = [
    {
        key: 'name',
        label: 'Thông tin thuộc tính',
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
        key: 'actions',
        label: 'Thao tác',
        sortable: false
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
                        <template #name-data="{ row }: IRow<IAttribute>">
                            <NuxtLink
                                :to="`${ROUTER.ATTRIBUTE}/${row.id}`"
                                class="inline-block"
                            >
                                <span class="capitalize text-primary line-clamp-1 flex-1">{{ row.name }}</span>
                            </NuxtLink>
                        </template>

                        <template #category_id-data="{ row }: IRow<IAttribute>">
                            <div
                                v-if="row.CategoryAttribute.length"
                                class="flex flex-col gap-1"
                            >
                                <UButton
                                    v-for="category in row.CategoryAttribute"
                                    :key="category.Category.id"
                                    :label="category.Category.name"
                                    :to="`${ROUTER.CATEGORY}/${category.Category.id}`"
                                    size="xs"
                                    color="gray"
                                    variant="solid"
                                />
                            </div>

                            <span v-else />
                        </template>

                        <template #status-data="{ row }: IRow<IAttribute>">
                            <UBadge
                                size="xs"
                                :label="valueTransform(optionStatus, row.status)?.name"
                                :color="valueTransform(optionStatus, row.status)?.color"
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
