<script setup lang="ts">

// ** Types Imports
import type { IRow } from '~/types/core.type'
import type { ISlider } from '~/types/slider.type'

// ** useHooks
const { path, search, isFetching, dataTable, dataAggregations } = useSliderDataTable()
const { isPending, mutateAsync } = useSliderFormDelete()

provide('search', search)
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

                <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
                    <UTable
                        :rows="dataTable"
                        :columns="sliderColumns"
                        :loading="isFetching || isPending"
                        class="w-full"
                        :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
                    >
                        <template #name-data="{ row }: IRow<ISlider>">
                            <div class="flex items-center gap-1">
                                <UAvatar
                                    :src="getImageFile(path, row.image_uri)"
                                    :alt="row.name"
                                />

                                <span class="capitalize text-primary flex-1 truncate">{{ row.name }}</span>
                            </div>
                        </template>

                        <template #status-data="{ row }: IRow<ISlider>">
                            <UToggle :model-value="row.status === STATUS.ACTIVE" />
                        </template>

                        <template #actions-data="{ row }">
                            <div class="flex gap-2">
                                <SliderUpdate
                                    :path="path"
                                    :slider="row"
                                />

                                <Confirm :remove="() => mutateAsync(row.id)" />
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
