<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { IProduct } from '~/types/product.type'

// ** Props & Emits
interface Props {
    label?: string
    name: string
}

const props = defineProps<Props>()

// ** useHooks
const { search, isFetching, dataTable, dataAggregations, suspense } = useProductDataTable()
const { value, errorMessage, handleChange } = useField<IProduct[]>(() => props.name, undefined, { syncVModel: true })

provide('search', search)

onMounted(async () => {
    await suspense()

    const product_id = value.value.map(_p => _p.id)

    handleChange(dataTable.value.filter(_d => product_id.includes(_d.id)))
})

// ** Computed
const error = computed(() => errorMessage.value)
</script>

<template>
    <UFormGroup
        :name="name"
        :error="error"
    >
        <div class="grid gap-4 grid-cols-12">
            <div class="col-span-12">
                <UDivider :label="label" />
            </div>

            <div class="col-span-12">
                <ProductSearch />
            </div>

            <div class="col-span-12">
                <div class="flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
                    <UTable
                        v-model="value"
                        :rows="dataTable"
                        :loading="isFetching"
                        :columns="productNoActionColumns"
                        class="w-full"
                        :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
                    >
                        <template #name-data="{ row }: IRow<IProduct>">
                            <ULink :to="goToPage(row.id, ROUTER.PRODUCT)">
                                <div class="flex items-center gap-1">
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

                                    <template v-if="row.special_price_type === SPECIAL_PRICE.PERCENT">
                                        {{ row.special_price }}%
                                    </template>

                                    <template v-else>
                                        {{ formatCurrency(Number(row.special_price)) }}
                                    </template>
                                </li>

                                <li v-if="row.discount_start_date">
                                    <span class="font-semibold capitalize">Ngày bắt đầu Sale:</span>
                                    {{ formatDateTime(row.discount_start_date) }}
                                </li>

                                <li v-if="row.discount_end_date">
                                    <span class="font-semibold capitalize">Ngày kết thúc Sale:</span>
                                    {{ formatDateTime(row.discount_end_date) }}
                                </li>

                                <li
                                    v-if="row.discount_type"
                                    :class="compareDateTime(row) ? '' : 'line-through'"
                                >
                                    <span class="font-semibold capitalize">Giá giảm Sale: </span>

                                    <template v-if="row.discount_type === SPECIAL_PRICE.PERCENT">
                                        {{ row.discount_amount }}%
                                    </template>

                                    <template v-else>
                                        {{ formatCurrency(Number(row.discount_amount)) }}
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
                                    v-if="row.brand"
                                    :to="goToPage(row.brand.id, ROUTER.BRAND)"
                                >
                                    <div class="flex items-center gap-1">
                                        <UAvatar
                                            :src="getPathImageFile(row.brand.image_uri)"
                                            :alt="row.brand.name"
                                        />

                                        <span class="capitalize text-primary flex-1 truncate">{{ row.brand.name }}</span>
                                    </div>
                                </ULink>

                                <ULink
                                    v-if="row.category"
                                    :to="goToPage(row.category.id, ROUTER.CATEGORY)"
                                >
                                    <div class="flex items-center gap-1">
                                        <UAvatar
                                            :src="getPathImageFile(row.category.image_uri)"
                                            :alt="row.category.name"
                                        />

                                        <span class="capitalize text-primary flex-1 truncate">{{ row.category.name }}</span>
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
                    </UTable>
                </div>
            </div>

            <div class="col-span-12">
                <Pagination :data-aggregations="dataAggregations" />
            </div>
        </div>
    </UFormGroup>
</template>
