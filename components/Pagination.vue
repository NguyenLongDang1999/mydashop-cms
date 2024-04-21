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
    <div class="mt-4 flex flex-wrap justify-between items-center">
        <UPagination
            v-model="search.page"
            :page-count="search.pageSize"
            :total="dataAggregations"
        />
    </div>
</template>
