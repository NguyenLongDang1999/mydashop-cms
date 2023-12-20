<script setup lang="ts">

// ** Third Party Imports

// ** Types Imports
// import type { ICategory } from '~/types/category.type'
// import type { IRow } from '~/types/core.type'

// ** useHooks
const config = useRuntimeConfig()

// const { data } = useQuery({
//     queryKey: ['fileManagerDataList'],
//     queryFn: () => useFetcher(config.public.bunnyApiBase + '/images-data/category', {
//         headers: {
//             AccessKey: 'e8625dd4-00c8-488c-8fef-aeeae2d1a9e44fdb3e47-695c-46a8-abc0-3e5608b72b8c'
//         }
//     })
// })

// const { data } = useFetch('https://sg.storage.bunnycdn.com/images-data', {
//     headers: {
//         Accesskey: 'e8625dd4-00c8-488c-8fef-aeeae2d1a9e44fdb3e47-695c-46a8-abc0-3e5608b72b8c'
//     }
// })

const { data } = useQueryFetch('category', '/data-list-123123', 'ababa')

// ** Computed
const fileManagerDataList = computed(() => data.value || [])
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách Files
                </h2>
            </div>
        </template>

        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-3">
                <FormInput
                    label="Tìm Kiếm"
                    name="search"
                />
            </div>
        </div>

        {{ fileManagerDataList }}
        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="[]"
                :columns="fileColumns"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }">
                    <span />
                </template>
            </UTable>
        </div>
    </UCard>
</template>
