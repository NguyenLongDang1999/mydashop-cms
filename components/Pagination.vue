<script setup lang="ts">

// ** Types Imports
import type { IPagination } from '~/types/core.type'

// ** Props & Emits
interface Props {
    dataAggregations: number
}

defineProps<Props>()

const search = inject('search') as IPagination
</script>


<template>
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
