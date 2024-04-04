<script setup lang="ts">

// ** Validations Imports
import { label, schema } from '~/validations/product-collection'

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { IProductCollectionForm } from '~/types/product-collection.type'
import type { IProduct } from '~/types/product.type'

// ** useHooks
const { isPending, mutateAsync } = useProductCollectionFormInput()
const { isFetching, dataTable, dataAggregations } = useProductDataTable()

const { handleSubmit, setFieldValue } = useForm<IProductCollectionForm>({
    validationSchema: schema
})

// ** Data
const isOpen = ref<boolean>(false)
const selected = ref<IProduct[]>([])

productColumns.pop()

// ** Methods
const onSubmit = handleSubmit(async values => {
    console.log({
        ...values,
        product_id: selected.value.map(_s => _s.id)
    })

    // await mutateAsync(values)
    // isOpen.value = false
})
</script>

<template>
    <UButton
        icon="i-heroicons-plus"
        size="sm"
        color="primary"
        variant="solid"
        label="Thêm Mới"
        :trailing="false"
        @click="isOpen = true"
    />

    <UModal
        v-model="isOpen"
        prevent-close
        :ui="{
            width: 'sm:max-w-6xl'
        }"
    >
        <UForm
            :state="schema"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h2 class="capitalize my-0 font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                            Thêm mới bộ sưu tập
                        </h2>

                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="isOpen = false"
                        />
                    </div>
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="sm:col-span-4 col-span-12">
                        <FormInput
                            :label="label.title"
                            name="title"
                            @update:model-value="val => setFieldValue('slug', slugify(val))"
                        />
                    </div>

                    <div class="sm:col-span-4 col-span-12">
                        <FormInput
                            :label="label.slug"
                            name="slug"
                        />
                    </div>

                    <div class="sm:col-span-4 col-span-12">
                        <FormSelect
                            :label="label.status"
                            :options="optionStatus"
                            name="status"
                        />
                    </div>

                    <div class="col-span-12">
                        <UDivider />
                    </div>

                    <div class="col-span-12">
                        <div class="grid gap-4 grid-cols-12">
                            <div class="col-span-12">
                                <h1 class="text-2xl text-center font-bold text-gray-900 dark:text-white tracking-tight capitalize">
                                    Lựa chọn sản phẩm
                                </h1>
                            </div>

                            <div class="col-span-12">
                                <ProductProductSearch />
                            </div>

                            <div class="col-span-12">
                                <div class="flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
                                    <UTable
                                        v-model="selected"
                                        :rows="dataTable"
                                        :columns="productColumns"
                                        :loading="Boolean(isFetching) || Boolean(isPending)"
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
                    </div>
                </div>

                <template #footer>
                    <div class="flex justify-center gap-4">
                        <UButton
                            type="submit"
                            size="sm"
                            variant="solid"
                            label="Thêm Mới"
                            :loading="Boolean(isPending)"
                            :trailing="false"
                        />

                        <UButton
                            type="reset"
                            size="sm"
                            color="gray"
                            variant="solid"
                            label="Huỷ Bỏ"
                            :trailing="false"
                            @click="isOpen = false"
                        />
                    </div>
                </template>
            </UCard>
        </UForm>
    </UModal>
</template>
