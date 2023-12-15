<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { IProduct } from '~/types/product.type'

// ** Props & Emits
interface Props {
    label?: string
    name: string
    modelValue?: number[]
}

const props = defineProps<Props>()

defineEmits(['selected'])

// ** Data
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
    }
]

// ** useHooks
const { path: pathBrand } = useBrand()
const { path: pathCategory } = useCategory()
const { path, search, isFetching, dataTable, dataAggregations } = useProductDataTable()

const { value, errorMessage, handleChange } = useField(() => props.name, undefined, {
    syncVModel: true,
    initialValue: props.modelValue || []
})

provide('search', search)

// ** Watch
watchEffect(() => props.modelValue ? handleChange(dataTable.value.filter((_d: IProduct) => props.modelValue?.includes(_d.id))) : undefined)

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
                        :columns="columns"
                        class="w-full"
                        :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
                        @update:model-value="$emit('selected', value)"
                    >
                        <template #name-data="{ row }: IRow<IProduct>">
                            <ULink :to="`${ROUTER.PRODUCT}/${row.id}`">
                                <div class="flex items-center gap-1">
                                    <UAvatar
                                        :src="getImageFile(path, row.image_uri)"
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
                                    <span class="font-semibold capitalize">Giá sale:</span>
                                    {{ row.discount || 0 }}%
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

                                        <span class="capitalize text-primary flex-1 truncate">{{ row.brand.name }}</span>
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
            </div>
        </div>
    </UFormGroup>
</template>
