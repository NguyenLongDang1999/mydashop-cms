<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { ISlider, ISliderSearch, ISliderTable } from '~/types/slider.type'

const columns = [
    {
        key: 'name',
        label: 'Thông tin slider'
    },
    {
        key: 'status',
        label: 'Trạng thái'
    },
    {
        key: 'actions',
        label: 'Thao tác'
    }
]

// ** useHooks
const { path, search } = useSlider()
const { isFetching, dataTable, dataAggregations } = useCrudDataTable<ISliderTable, ISliderSearch>(path.value, { params: search })
const { isLoading, dataDelete } = useCrudDelete(path.value)
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý giao diện"
            title="Slider"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UCard>
                <template #header>
                    <div class="flex justify-between items-center">
                        <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                            Danh sách Slider
                        </h2>

                        <SliderForm />
                    </div>
                </template>

                <SliderSearch />

                <div class="mt-4">
                    <UTable
                        :rows="dataTable"
                        :columns="columns"
                        :loading="isFetching || isLoading"
                        class="w-full"
                        :ui="{ td: { base: 'max-w-[0] truncate' }, th: { base: 'whitespace-nowrap' } }"
                    >
                        <template #name-data="{ row }: IRow<ISlider>">
                            <div class="flex items-center gap-1">
                                <UAvatar
                                    :src="getImageFile(path, row.image_uri)"
                                    :alt="row.name"
                                />

                                <span class="capitalize text-primary line-clamp-1 flex-1">{{ row.name }}</span>
                            </div>
                        </template>

                        <template #status-data="{ row }: IRow<ISlider>">
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
                                <SliderUpdate :slider="row" />
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
