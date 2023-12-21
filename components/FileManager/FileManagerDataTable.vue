<script setup lang="ts">

// ** Types Imports
import type { BreadcrumbLink } from '@nuxt/ui/dist/runtime/types'

// ** useHooks
const { route, search, dataTable, isFetching, pathName } = useFileManagerDataTable()

// ** Data
const links: BreadcrumbLink[] = [{
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/file-manager'
}]

if (route.params.path && route.params.path.length) {
    let currentPath = '/file-manager';

    (route.params.path as string[]).forEach(_p => {
        currentPath += '/' + _p

        links.push({
            label: _p,
            icon: 'i-heroicons-folder',
            to: currentPath
        })
    })
}
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
            <div class="col-span-12">
                <div class="bg-slate-100 px-3 py-2 rounded-md">
                    <UBreadcrumb :links="links" />
                </div>
            </div>

            <div class="col-span-12">
                <div class="flex gap-2">
                    <FileManagerCreateFolder />
                    <FileManagerUploadFile />
                </div>
            </div>

            <div class="col-span-3">
                <FormInput
                    v-model="search"
                    label="Tìm Kiếm"
                    name="search_file"
                    autocomplete="off"
                />
            </div>
        </div>

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="fileColumns"
                :loading="isFetching"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }">
                    <ULink
                        v-if="!row.Length"
                        class="flex items-center gap-2 font-medium text-primary hover:underline"
                        :to="`${$route.path}/${row.ObjectName}`"
                    >
                        <UIcon name="i-heroicons-folder" />
                        <span class="truncate flex-1">{{ row.ObjectName }}</span>
                    </ULink>

                    <UPopover
                        v-else
                        mode="hover"
                    >
                        <div class="flex items-center gap-2 font-medium">
                            <UIcon name="i-heroicons-document" />
                            <span class="truncate flex-1">{{ row.ObjectName }}</span>
                        </div>

                        <template #panel>
                            <div class="p-2">
                                <UAvatar
                                    :src="getImageFile(pathName, row.ObjectName)"
                                    :alt="row.ObjectName"
                                    size="lg"
                                />
                            </div>
                        </template>
                    </UPopover>
                </template>

                <template #size-data="{ row }">
                    <span>{{ row.Length ? (row.Length / 1000).toFixed(2) + ' kB' : '-' }} </span>
                </template>

                <template #date_modified-data="{ row }">
                    <span>{{ formatDateTime(row.DateCreated) }}</span>
                </template>

                <template #actions-data="{ row }">
                    <div class="flex gap-2">
                        <Confirm :remove="() => useFileManagerDelete(row.ObjectName, !row.Length)" />
                    </div>
                </template>
            </UTable>
        </div>
    </UCard>
</template>
