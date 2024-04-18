<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type';
import type { IProductCategory } from '~/types/product-category.type';

// ** Props & Emits
interface Props {
    name: string
}

const props = defineProps<Props>()

// ** useHooks
const { isFetching, dataTable, dataAggregations, suspense } = useProductCategoryDataTable()
const { value, errorMessage, setValue } = useField<string[]>(() => props.name, undefined, { syncVModel: true })

// ** Data
const selected = ref<IProductCategory[]>([])
const categoryTableColumns = ref(_clone(categoryColumns))

// ** Set Data
categoryTableColumns.value.pop()

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
                <ProductCategorySearch />
            </div>

            <div class="col-span-12">
                <div class="flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
                    <UTable
                        v-model="selected"
                        :rows="dataTable"
                        :columns="categoryTableColumns"
                        :loading="Boolean(isFetching)"
                        class="w-full"
                        :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
                    >
                        <template #name-data="{ row }: IRow<IProductCategory>">
                            <ULink :to="goToPage(row.id)">
                                <div class="flex items-center gap-1">
                                    <UAvatar
                                        :src="getPathImageFile(row.image_uri)"
                                        :alt="row.name"
                                    />

                                    <div class="flex flex-col flex-1 truncate">
                                        <span class="capitalize text-primary truncate">{{ row.name }}</span>
                                        <span>{{ row.product.length }} Sản Phẩm</span>
                                    </div>
                                </div>
                            </ULink>
                        </template>

                        <template #parent_id-data="{ row }: IRow<IProductCategory>">
                            <ULink
                                v-if="row.parentCategory"
                                :to="goToPage(row.parentCategory.id)"
                            >
                                <div class="flex items-center gap-1">
                                    <UAvatar
                                        :src="getPathImageFile(row.parentCategory.image_uri)"
                                        :alt="row.parentCategory.name"
                                    />

                                    <div class="flex flex-col flex-1 truncate">
                                        <span class="capitalize text-primary truncate">{{ row.parentCategory.name }}</span>
                                        <span>{{ row.parentCategory.product?.length }} Sản Phẩm</span>
                                    </div>
                                </div>
                            </ULink>

                            <span v-else />
                        </template>

                        <template #status-data="{ row }: IRow<IProductCategory>">
                            <UToggle :model-value="String(row.status) === STATUS.ACTIVE" />
                        </template>

                        <template #created_at-data="{ row }: IRow<IProductCategory>">
                            <span>{{ formatDateTime(row.created_at) }}</span>
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
