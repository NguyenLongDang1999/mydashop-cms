<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { IProduct } from '~/types/product.type'

// ** useHooks
const { productCategoryId, isFetching, dataTable, dataAggregations } = useProductDataTable()
const { isPending, mutateAsync } = useProductFormDelete()

// ** Data
const productTableColumns = ref(_clone(productColumns))

// ** Set Data
productTableColumns.value.pop()
</script>

<template>
    <ProductProductSearch :product-category-id="productCategoryId" />

    <div class="my-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
        <UTable
            :rows="dataTable"
            :columns="productTableColumns"
            :loading="Boolean(isFetching) || Boolean(isPending)"
            class="w-full"
            :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
        >
            <template #name-data="{ row }: IRow<IProduct>">
                <ULink :to="goToPage(row.id, ROUTER.PRODUCT)">
                    <UBadge
                        v-if="row.hasFlashDeals"
                        color="red"
                    >
                        Flash Deals
                    </UBadge>

                    <div class="flex items-center gap-1 mt-2">
                        <UAvatar
                            :src="getPathImageFile(row.image_uri)"
                            :alt="row.name"
                        />

                        <div class="flex flex-col flex-1 truncate">
                            <span class="capitalize text-primary truncate">{{ row.name }}</span>
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

                    <li :class="compareDateTime(row) ? 'line-through' : ''">
                        <span class="font-semibold capitalize">Giá giảm: </span>

                        <template v-if="String(row.special_price_type) === SPECIAL_PRICE.PERCENT">
                            {{ row.special_price }}%
                        </template>

                        <template v-else>
                            {{ formatCurrency(Number(row.special_price)) }}
                        </template>
                    </li>

                    <li>
                        <span class="font-semibold capitalize">Giá bán:</span>
                        {{ formatSellingPrice(row) }}
                    </li>
                </ul>
            </template>

            <template #category_id-data="{ row }: IRow<IProduct>">
                <div class="flex flex-col gap-1">
                    <ULink
                        v-if="row.productBrand"
                        :to="goToPage(row.productBrand.id, ROUTER.PRODUCT_BRAND)"
                    >
                        <div class="flex items-center gap-1">
                            <UAvatar
                                :src="getPathImageFile(row.productBrand.image_uri)"
                                :alt="row.productBrand.name"
                            />

                            <span class="capitalize text-primary flex-1 truncate">{{ row.productBrand.name }}</span>
                        </div>
                    </ULink>

                    <ULink
                        v-if="row.productCategory"
                        :to="goToPage(row.productCategory.id, ROUTER.PRODUCT_CATEGORY)"
                    >
                        <div class="flex items-center gap-1">
                            <UAvatar
                                :src="getPathImageFile(row.productCategory.image_uri)"
                                :alt="row.productCategory.name"
                            />

                            <span class="capitalize text-primary flex-1 truncate">{{ row.productCategory.name }}</span>
                        </div>
                    </ULink>
                </div>
            </template>

            <template #status-data="{ row }: IRow<IProduct>">
                <UToggle :model-value="String(row.status) === STATUS.ACTIVE" />
            </template>

            <template #actions-data="{ row }: IRow<IProduct>">
                <div class="flex gap-2">
                    <UButton
                        icon="i-heroicons-pencil-square"
                        size="sm"
                        color="orange"
                        square
                        variant="solid"
                        :to="goToPage(row.id, ROUTER.PRODUCT)"
                    />

                    <Confirm :remove="() => mutateAsync({ id: row.id })" />
                </div>
            </template>
        </UTable>
    </div>

    <Pagination :data-aggregations="dataAggregations" />
</template>
