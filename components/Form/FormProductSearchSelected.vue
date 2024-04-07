<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type';
import type { IProduct } from '~/types/product.type';

// ** Props & Emits
interface Props {
    name: string
}

const props = defineProps<Props>()

// ** useHooks
const { isFetching, dataTable, dataAggregations, suspense } = useProductDataTable()
const { value, errorMessage, setValue } = useField<string[]>(() => props.name, undefined, { syncVModel: true })

// ** Data
const selected = ref<IProduct[]>([])
const productTableColumns = ref(_clone(productColumns))

// ** Set Data
productTableColumns.value.pop()

onMounted(async () => {
    await suspense()

    selected.value = dataTable.value.filter(_d => value.value.includes(_d.id))
})

// ** Computed
const error = computed(() => errorMessage.value)

// ** Watch
watch(selected, () => setValue(selected.value.map(_p => _p.id)))
</script>

<template>
    <UFormGroup
        :name="name"
        :error="error"
    >
        <div class="grid gap-4 grid-cols-12">
            <div class="col-span-12">
                <ProductProductSearch />
            </div>

            <div class="col-span-12">
                <div class="flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
                    <UTable
                        v-model="selected"
                        :rows="dataTable"
                        :columns="productTableColumns"
                        :loading="Boolean(isFetching)"
                        class="w-full"
                        :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
                    >
                        <template #name-data="{ row }: IRow<IProduct>">
                            <ULink :to="goToPage(row.id)">
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
                    </UTable>
                </div>
            </div>

            <div class="col-span-12">
                <Pagination :data-aggregations="dataAggregations" />
            </div>
        </div>
    </UFormGroup>
</template>
