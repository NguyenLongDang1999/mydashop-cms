<script setup lang="ts">

// ** Types Imports
import type { BreadcrumbLink } from '@nuxt/ui/dist/runtime/types'

// ** Props & Emits
interface Props {
    closeButton?: () => void
}

const props = defineProps<Props>()

defineEmits(['imageUrl'])

// ** useHooks
const { route, search, dataTable, isFetching, pathName, pathSplit } = useFileManagerDataTable()

// ** Data
const links = ref<BreadcrumbLink[]>([{
    label: 'Home',
    icon: 'i-heroicons-home',
    to: route.path
}])

// ** Watch
watch(() => route.query, () => {
    links.value.splice(1)

    if (pathSplit.value && pathSplit.value.length) {
        pathSplit.value.forEach((_p, index) => {
            links.value.push({
                label: _p,
                icon: 'i-heroicons-folder',
                to: `?path=${pathSplit.value.slice(0, index + 1).join(',')}`
            })
        })
    }
})

watch(() => props.closeButton, () => navigateTo(route.path))

// ** useHooks
const { mutateAsync, isPending } = useFileManagerDelete()

// ** Methods
const generateDynamicPath = (objectName: string) => {
    const currentPath = route.query.path || ''
    const  pathArray = (currentPath as string).split(',').filter(segment => segment.trim() !== '')

    pathArray.push(objectName)

    return `?path=${pathArray.join(',')}`
}
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách Files
                </h2>

                <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="-my-1"
                    @click="closeButton"
                />
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
                :loading="isFetching || isPending"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }">
                    <ULink
                        v-if="!row.Length"
                        class="flex items-center gap-2 font-medium text-primary hover:underline"
                        :to="generateDynamicPath(row.ObjectName)"
                    >
                        <UIcon name="i-heroicons-folder" />
                        <span class="truncate flex-1">{{ row.ObjectName }}</span>
                    </ULink>

                    <UPopover
                        v-else
                        mode="hover"
                    >
                        <div
                            class="flex items-center gap-2 font-medium"
                            @click="closeButton"
                        >
                            <UIcon
                                name="i-heroicons-document"
                                @click="$emit('imageUrl', formatPathFile(row.Path, row.ObjectName))"
                            />
                            <span
                                class="truncate flex-1"
                                @click="$emit('imageUrl', formatPathFile(row.Path, row.ObjectName))"
                            >{{ row.ObjectName }}</span>
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
                        <Confirm
                            :remove="() => mutateAsync({
                                fileName: row.ObjectName,
                                isFolder: !row.Length
                            })"
                        />
                    </div>
                </template>
            </UTable>
        </div>
    </UCard>
</template>
