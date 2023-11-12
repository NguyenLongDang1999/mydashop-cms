<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { IProduct, IProductSearch, IProductTable } from '~/types/product.type'

const columns = [
    {
        key: 'name',
        label: 'Thông tin sản phẩm',
        sortable: true
    },
    {
        key: 'category_id',
        label: 'Danh mục',
        sortable: true
    },
    {
        key: 'brand_id',
        label: 'Thương hiệu',
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
const { path: pathBrand } = useBrand()
const { path: pathCategory } = useCategory()
const { path, search } = useProduct()
const { isFetching, dataTable, dataAggregations } = useCrudDataTable<IProductTable, IProductSearch>(path.value, { params: search })
const { isLoading, dataDelete } = useCrudDelete(path.value)
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý sản phẩm"
            title="Sản phẩm"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UCard>
                <template #header>
                    <div class="flex justify-between items-center">
                        <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                            Danh sách sản phẩm
                        </h2>

                        <UButton
                            icon="i-heroicons-plus"
                            size="sm"
                            color="primary"
                            variant="solid"
                            label="Thêm Mới"
                            :trailing="false"
                            to="/product/create"
                        />
                    </div>
                </template>

                <ProductSearch />

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
                        <template #name-data="{ row }: IRow<IProduct>">
                            <NuxtLink
                                :to="`${ROUTER.PRODUCT}/${row.id}`"
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

                        <template #category_id-data="{ row }: IRow<IProduct>">
                            <NuxtLink
                                v-if="row.Category"
                                :to="`${ROUTER.CATEGORY}/${row.Category.id}`"
                                class="inline-block"
                            >
                                <div class="flex items-center gap-1">
                                    <UAvatar
                                        :src="getImageFile(pathCategory, row.Category.image_uri)"
                                        :alt="row.Category.name"
                                    />

                                    <span class="capitalize text-primary line-clamp-1 flex-1">{{ row.Category.name }}</span>
                                </div>
                            </NuxtLink>
                        </template>

                        <template #brand_id-data="{ row }: IRow<IProduct>">
                            <NuxtLink
                                v-if="row.Brand"
                                :to="`${ROUTER.BRAND}/${row.Brand.id}`"
                                class="inline-block"
                            >
                                <div class="flex items-center gap-1 truncate">
                                    <UAvatar
                                        :src="getImageFile(pathBrand, row.Brand.image_uri)"
                                        :alt="row.Brand.name"
                                    />

                                    <span class="capitalize line-clamp-1 text-primary flex-1">{{ row.Brand.name }}</span>
                                </div>
                            </NuxtLink>

                            <span v-else />
                        </template>

                        <template #status-data="{ row }: IRow<IProduct>">
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
                                    :to="`${ROUTER.PRODUCT}/${row.id}`"
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
