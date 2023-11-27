<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { IProduct, IProductSearch, IProductTable } from '~/types/product.type'

const columns = [
    {
        key: 'name',
        label: 'Thông tin sản phẩm',
        class: 'min-w-[250px]'
    },
    {
        key: 'price',
        label: 'Giá tiền',
        class: 'min-w-[160px]'
    },
    {
        key: 'category_id',
        label: 'Danh mục',
        class: 'min-w-[160px]'
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
        label: 'Thao tác'
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
                        class="w-full"
                        :ui="{ td: { base: 'max-w-[0] truncate' }, th: { base: 'whitespace-nowrap' } }"
                    >
                        <template #name-data="{ row }: IRow<IProduct>">
                            <ULink
                                :to="`${ROUTER.PRODUCT}/${row.id}`"
                                class="inline-block"
                            >
                                <div class="flex items-center gap-1">
                                    <UAvatar
                                        :src="getImageFile(path, row.image_uri)"
                                        :alt="row.name"
                                    />

                                    <div class="flex flex-col flex-1">
                                        <span class="capitalize text-primary">{{ row.name }}</span>
                                        <span>{{ row.sku }}</span>
                                    </div>
                                </div>
                            </ULink>
                        </template>

                        <template #price-data="{ row }: IRow<IProduct>">
                            <ul>
                                <li>
                                    <span class="font-semibold capitalize">Giá gốc:</span>
                                    {{ formatCurrency(Number(row.price)) }}
                                </li>

                                <li>
                                    <span class="font-semibold capitalize">Giá giảm: </span>

                                    <template v-if="row.special_price_type === SPECIAL_PRICE.PERCENT">
                                        {{ row.special_price }}%
                                    </template>

                                    <template v-else>
                                        {{ formatCurrency(Number(row.special_price)) }}
                                    </template>
                                </li>

                                <li>
                                    <span class="font-semibold capitalize">Giá bán:</span>
                                    {{ formatCurrency(Number(row.selling_price)) }}
                                </li>
                            </ul>
                        </template>

                        <template #category_id-data="{ row }: IRow<IProduct>">
                            <div class="flex flex-col gap-1">
                                <ULink
                                    v-if="row.brand"
                                    :to="`${ROUTER.BRAND}/${row.brand.id}`"
                                >
                                    <div class="flex items-center gap-1">
                                        <UAvatar
                                            :src="getImageFile(pathBrand, row.brand.image_uri)"
                                            :alt="row.brand.name"
                                        />

                                        <span class="capitalize text-primary flex-1">{{ row.brand.name }}</span>
                                    </div>
                                </ULink>

                                <ULink
                                    v-if="row.category"
                                    :to="`${ROUTER.CATEGORY}/${row.category.id}`"
                                >
                                    <div class="flex items-center gap-1">
                                        <UAvatar
                                            :src="getImageFile(pathCategory, row.category.image_uri)"
                                            :alt="row.category.name"
                                        />

                                        <span class="capitalize text-primary flex-1">{{ row.category.name }}</span>
                                    </div>
                                </ULink>
                            </div>
                        </template>

                        <template #status-data="{ row }: IRow<IProduct>">
                            <UToggle :model-value="row.status === STATUS.ACTIVE" />
                        </template>

                        <template #popular-data="{ row }">
                            <UToggle :model-value="row.popular === POPULAR.ACTIVE" />
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
