<script setup lang="ts">

// ** Types Imports
import type { IBrand } from '~/types/brand.type'
import type { IRow } from '~/types/core.type'

// ** useHooks
const { search, isFetching, dataTable, dataAggregations } = useBrandDataTable()
const { isPending, mutateAsync } = useBrandFormDelete()

provide('search', search)
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách thương hiệu
                </h2>

                <BrandForm />
            </div>
        </template>

        <BrandSearch />

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="brandColumns"
                :loading="isFetching || isPending"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }: IRow<IBrand>">
                    <ULink :to="goToPage(row.id)">
                        <div class="flex items-center gap-1">
                            <UAvatar
                                :src="getPathImageFile(row.image_uri)"
                                :alt="row.name"
                            />

                            <span class="capitalize text-primary flex-1 truncate">{{ row.name }}</span>
                        </div>
                    </ULink>
                </template>

                <template #category_id-data="{ row }: IRow<IBrand>">
                    <div
                        v-if="row.categories.length"
                        class="flex flex-wrap gap-1"
                    >
                        <UButton
                            v-for="category in row.categories"
                            :key="category.id"
                            :label="category.name"
                            :to="goToPage(category.id, ROUTER.CATEGORY)"
                            size="xs"
                            color="gray"
                            variant="solid"
                        />
                    </div>

                    <span v-else />
                </template>

                <template #status-data="{ row }: IRow<IBrand>">
                    <UToggle :model-value="row.status === STATUS.ACTIVE" />
                </template>

                <template #popular-data="{ row }: IRow<IBrand>">
                    <UToggle :model-value="row.popular === POPULAR.ACTIVE" />
                </template>

                <template #actions-data="{ row }: IRow<IBrand>">
                    <div class="flex gap-2">
                        <UButton
                            icon="i-heroicons-pencil-square"
                            size="sm"
                            color="orange"
                            square
                            variant="solid"
                            :to="goToPage(row.id)"
                        />

                        <Confirm :remove="() => mutateAsync({ id: row.id })" />
                    </div>
                </template>
            </UTable>
        </div>

        <template #footer>
            <Pagination :data-aggregations="dataAggregations" />
        </template>
    </UCard>
</template>
